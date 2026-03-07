// =====================================================
// seed.js - يحمل البيانات الأولية في MongoDB
// الاستخدام: node seed.js
// =====================================================
import dotenv from "dotenv"
import mongoose from "mongoose"
import { statsModel }        from "./src/database/models/stats.model.js"
import { projectModel }      from "./src/database/models/project.model.js"
import { reportModel }       from "./src/database/models/report.model.js"
import { notificationModel } from "./src/database/models/notification.model.js"

dotenv.config()

// ✅ 12 شهر عشان الـ chart يبان كامل ومحترم
const seedStats = [
    { carbonEmissions: 5100, renewableEnergy: 28, waterConsumption: 14200, sustainabilityScore: 74, month: "Apr", year: 2025 },
    { carbonEmissions: 5000, renewableEnergy: 29, waterConsumption: 14000, sustainabilityScore: 75, month: "May", year: 2025 },
    { carbonEmissions: 4900, renewableEnergy: 30, waterConsumption: 13800, sustainabilityScore: 76, month: "Jun", year: 2025 },
    { carbonEmissions: 4800, renewableEnergy: 31, waterConsumption: 13600, sustainabilityScore: 78, month: "Jul", year: 2025 },
    { carbonEmissions: 4700, renewableEnergy: 31, waterConsumption: 13400, sustainabilityScore: 79, month: "Aug", year: 2025 },
    { carbonEmissions: 4600, renewableEnergy: 32, waterConsumption: 13200, sustainabilityScore: 80, month: "Sep", year: 2025 },
    { carbonEmissions: 4500, renewableEnergy: 32, waterConsumption: 13000, sustainabilityScore: 81, month: "Oct", year: 2025 },
    { carbonEmissions: 4400, renewableEnergy: 33, waterConsumption: 12900, sustainabilityScore: 82, month: "Nov", year: 2025 },
    { carbonEmissions: 4300, renewableEnergy: 33, waterConsumption: 12800, sustainabilityScore: 83, month: "Dec", year: 2025 },
    { carbonEmissions: 4250, renewableEnergy: 34, waterConsumption: 12800, sustainabilityScore: 84, month: "Jan", year: 2026 },
    { carbonEmissions: 4100, renewableEnergy: 36, waterConsumption: 12500, sustainabilityScore: 86, month: "Feb", year: 2026 },
    { carbonEmissions: 3950, renewableEnergy: 38, waterConsumption: 12200, sustainabilityScore: 87, month: "Mar", year: 2026 },
]

const seedProjects = [
    { name: "Solar Park Phase 2",        sectorAr: "صناعي", sectorEn: "Industrial",  statusAr: "متحسن", statusEn: "Improved", statusColor: "green",  progress: 78 },
    { name: "Green Building Initiative", sectorAr: "سكني",  sectorEn: "Residential", statusAr: "تقدم",  statusEn: "Progress", statusColor: "yellow", progress: 45 },
    { name: "Waste Management System",   sectorAr: "تجاري", sectorEn: "Commercial",  statusAr: "جيد",   statusEn: "Good",     statusColor: "red",    progress: 30 },
    { name: "Electric Bus Fleet",        sectorAr: "نقل",   sectorEn: "Transport",   statusAr: "متحسن", statusEn: "Improved", statusColor: "green",  progress: 90 },
    { name: "Smart Grid Deployment",     sectorAr: "صناعي", sectorEn: "Industrial",  statusAr: "متحسن", statusEn: "Improved", statusColor: "green",  progress: 65 },
]

// ✅ downloadUrl فيه PDF حقيقي تجريبي — بدّله بـ link بتاعك لما يكون جاهز
const SAMPLE_PDF = "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF1"

const seedReports = [
    { titleEn: "January 2026",  titleAr: "يناير 2026",  type: "Monthly",   size: "2.4 MB",  downloadUrl: SAMPLE_PDF },
    { titleEn: "December 2025", titleAr: "ديسمبر 2025", type: "Annual",    size: "15.8 MB", downloadUrl: SAMPLE_PDF },
    { titleEn: "November 2025", titleAr: "نوفمبر 2025", type: "Monthly",   size: "2.1 MB",  downloadUrl: SAMPLE_PDF },
    { titleEn: "Q3 2025",       titleAr: "الربع الثالث 2025", type: "Quarterly", size: "5.3 MB",  downloadUrl: SAMPLE_PDF },
    {
        titleEn:"Q2 2025", titleAr:"الربع الثاني 2025", type:"Quarterly", size:"4.1 MB", downloadUrl: SAMPLE_PDF
    },{
        titleEn:"Q1 2025", titleAr:"الربع الاول 2025", type:"Quarterly", size:"3.9 MB", downloadUrl: SAMPLE_PDF
    }
]

const seedNotifications = [
    { messageAr: "تنبيه النظام: تجاوزت مستويات الكربون الحد المسموح به في القطاع أ", messageEn: "System Alert: Carbon levels exceeded the allowed limit in Sector A", color: "red",    read: false },
    { messageAr: "تحديث المشروع: اكتمال المرحلة الثانية من حديقة الطاقة الشمسية",   messageEn: "Project Update: Phase 2 of Solar Park completed",                  color: "green",  read: false },
    { messageAr: "تحسن ملحوظ في درجة الاستدامة خلال الربع الأخير",                   messageEn: "Significant improvement in sustainability score this quarter",       color: "green",  read: false },
    { messageAr: "تم استلام إشعار جديد",                                              messageEn: "New notification received",                                        color: "yellow", read: true  },
]

async function seed() {
    try {
        await mongoose.connect(process.env.CONNECT_URL)
        console.log("✅ Connected to MongoDB")

        await Promise.all([
            statsModel.deleteMany({}),
            projectModel.deleteMany({}),
            reportModel.deleteMany({}),
            notificationModel.deleteMany({}),
        ])
        console.log("🗑️  Old data cleared")

        await Promise.all([
            statsModel.insertMany(seedStats),
            projectModel.insertMany(seedProjects),
            reportModel.insertMany(seedReports),
            notificationModel.insertMany(seedNotifications),
        ])
        console.log("🌱 Seed data inserted successfully!")

    } catch (err) {
        console.error("❌ Seed failed:", err.message)
    } finally {
        await mongoose.disconnect()
        console.log("🔌 Disconnected")
    }
}

seed()