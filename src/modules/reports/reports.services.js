import { reportModel } from "../../database/models/report.model.js"
import { statsModel }  from "../../database/models/stats.model.js"
import Groq            from "groq-sdk"

// ── مساعد: يجيب نص الـ PDF من الـ URL ──────────────────────────────────
async function fetchPdfText(url) {
  try {
    const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js")
    const res    = await fetch(url)
    const buffer = Buffer.from(await res.arrayBuffer())
    const data   = await pdfParse(buffer)
    // بناخد أول 3000 حرف بس عشان متعداش الـ token limit
    return data.text?.slice(0, 3000) || null
  } catch {
    return null
  }
}

// GET /api/reports
export const getAllReports = async (req, res, next) => {
  const reports = await reportModel.find({ isDeleted: false }).lean()
  return res.status(200).json({ success: true, result: reports })
}

// GET /api/reports/ai-summary
export const getAiSummary = async (req, res, next) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

  // ── حاول تقرأ أحدث تقرير PDF ──────────────────────────────────────────
  const latestReport = await reportModel.findOne({ isDeleted: false, downloadUrl: { $ne: null } })
    .sort({ createdAt: -1 }).lean()

  let contextText = null

  if (latestReport?.downloadUrl) {
    contextText = await fetchPdfText(latestReport.downloadUrl)
  }

  // ── لو مقدرش يقرأ الـ PDF، يرجع للـ stats ─────────────────────────────
  if (!contextText) {
    const latest = await statsModel.findOne().sort({ createdAt: -1 }).lean()
    contextText = latest
      ? `Carbon: ${latest.carbonEmissions} tons, Renewable: ${latest.renewableEnergy}%, Water: ${latest.waterConsumption} m³, Score: ${latest.sustainabilityScore}/100`
      : "Carbon: 4250 tons, Renewable: 34%, Water: 12800 m³, Score: 84/100"
  }

  const [arRes, enRes] = await Promise.all([
    groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: `أنت خبير اقتصاد أخضر. اكتب ملخصاً (2-3 جمل) لهذه البيانات أو المحتوى: ${contextText} مع توصيات. العربية فقط.` }],
      max_tokens: 300,
    }),
    groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: `Green economy expert. Write a summary (2-3 sentences) for this data or content: ${contextText} with recommendations. English only.` }],
      max_tokens: 300,
    }),
  ])

  return res.status(200).json({
    success: true,
    result: {
      ar: arRes.choices[0].message.content.trim(),
      en: enRes.choices[0].message.content.trim(),
    },
  })
}

// GET /api/reports/:id/download
export const downloadReport = async (req, res, next) => {
  const report = await reportModel.findOne({ _id: req.params.id, isDeleted: false }).lean()
  if (!report) return next(new Error("Report not found", { cause: 404 }))
  if (!report.downloadUrl) return next(new Error("No file attached to this report", { cause: 404 }))
  return res.status(200).json({ success: true, result: { downloadUrl: report.downloadUrl } })
}

