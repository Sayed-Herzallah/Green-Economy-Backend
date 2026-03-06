import { statsModel } from "../../database/models/stats.model.js"
import { projectModel } from "../../database/models/project.model.js"
import Groq from "groq-sdk"

// GET /dashboard/stats
export const getStats = async (req, res, next) => {
  const latest = await statsModel.findOne().sort({ createdAt: -1 }).lean()
  if (!latest) return res.status(200).json({ success: true, result: [] })

  const result = [
    { id: 1, titleAr: "انبعاثات الكربون", titleEn: "Carbon Emissions", value: latest.carbonEmissions.toLocaleString(), unit: "tons", change: -5.2, icon: "☁️" },
    { id: 2, titleAr: "نسبة الطاقة المتجددة", titleEn: "Renewable Energy Rate", value: String(latest.renewableEnergy), unit: "%", change: 2.1, icon: "☀️" },
    { id: 3, titleAr: "استهلاك المياه", titleEn: "Water Consumption", value: latest.waterConsumption.toLocaleString(), unit: "m³", change: -1.4, icon: "💧" },
    { id: 4, titleAr: "درجة الاستدامة", titleEn: "Sustainability Score", value: String(latest.sustainabilityScore), unit: "/100", change: 3.5, icon: "🌱" },
  ]
  return res.status(200).json({ success: true, result })
}

// GET /dashboard/chart
export const getChart = async (req, res, next) => {
  const records = await statsModel.find().sort({ createdAt: 1 }).limit(12).lean()
  const result = records.map(r => ({ month: r.month, value: r.sustainabilityScore }))
  return res.status(200).json({ success: true, result })
}

// GET /dashboard/sectors
export const getSectors = async (req, res, next) => {
  const projects = await projectModel.find({ isDeleted: false }).lean()
  if (!projects.length) return res.status(200).json({ success: true, result: [] })

  const sectorMap = {}
  projects.forEach(p => { sectorMap[p.sectorEn] = (sectorMap[p.sectorEn] || 0) + 1 })
  const colors = { Industrial: "#166534", Residential: "#22c55e", Commercial: "#86efac", Transport: "#dcfce7" }
  const arMap = { Industrial: "صناعي", Residential: "سكني", Commercial: "تجاري", Transport: "نقل" }

  const result = Object.entries(sectorMap).map(([key, count]) => ({
    labelAr: arMap[key] || key,
    labelEn: key,
    value: Math.round((count / projects.length) * 100),
    color: colors[key] || "#16a34a",
  }))
  return res.status(200).json({ success: true, result })
}

// GET /dashboard/ai-insight
export const getAiInsight = async (req, res, next) => {
    const latest = await statsModel.findOne().sort({ createdAt: -1 }).lean()
    const statsText = latest
      ? `Carbon: ${latest.carbonEmissions} tons, Renewable: ${latest.renewableEnergy}%, Water: ${latest.waterConsumption} m³, Score: ${latest.sustainabilityScore}/100`
      : null

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

  const [arRes, enRes] = await Promise.all([
    groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: `أنت خبير اقتصاد أخضر. بناءً على: ${statsText} - رؤية واحدة قصيرة جداً للتحسين. العربية فقط.` }],
      max_tokens: 150,
    }),
    groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: `Green economy expert. Based on: ${statsText} - One very short insight to improve. English only.` }],
      max_tokens: 150,
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


