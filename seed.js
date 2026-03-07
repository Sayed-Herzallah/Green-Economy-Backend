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

// ✅ 12 شهر + إضافة بيانات إضافية
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
    // إضافة 4 أشهر إضافية لتكبير البيانات
    { carbonEmissions: 4000, renewableEnergy: 35, waterConsumption: 12400, sustainabilityScore: 85, month: "Apr", year: 2026 },
    { carbonEmissions: 3900, renewableEnergy: 37, waterConsumption: 12100, sustainabilityScore: 88, month: "May", year: 2026 },
    { carbonEmissions: 3850, renewableEnergy: 38, waterConsumption: 12000, sustainabilityScore: 89, month: "Jun", year: 2026 },
    { carbonEmissions: 3800, renewableEnergy: 39, waterConsumption: 11800, sustainabilityScore: 90, month: "Jul", year: 2026 },
]

const seedProjects = [
    { name: "Solar Park Phase 2",        sectorAr: "صناعي", sectorEn: "Industrial",  statusAr: "متحسن", statusEn: "Improved", statusColor: "green",  progress: 78 },
    { name: "Green Building Initiative", sectorAr: "سكني",  sectorEn: "Residential", statusAr: "تقدم",  statusEn: "Progress", statusColor: "yellow", progress: 45 },
    { name: "Waste Management System",   sectorAr: "تجاري", sectorEn: "Commercial",  statusAr: "جيد",   statusEn: "Good",     statusColor: "red",    progress: 30 },
    { name: "Electric Bus Fleet",        sectorAr: "نقل",   sectorEn: "Transport",   statusAr: "متحسن", statusEn: "Improved", statusColor: "green",  progress: 90 },
    { name: "Smart Grid Deployment",     sectorAr: "صناعي", sectorEn: "Industrial",  statusAr: "متحسن", statusEn: "Improved", statusColor: "green",  progress: 65 },
    // مشاريع إضافية
    { name: "Eco Park Expansion",        sectorAr: "تجاري", sectorEn: "Commercial",  statusAr: "تقدم", statusEn: "Progress", statusColor: "yellow", progress: 50 },
    { name: "Urban Wind Turbines",       sectorAr: "سكني",  sectorEn: "Residential", statusAr: "جيد",  statusEn: "Good", statusColor: "red", progress: 25 },
    { name: "Battery Storage Facility",  sectorAr: "صناعي", sectorEn: "Industrial",  statusAr: "متحسن", statusEn: "Improved", statusColor: "green", progress: 70 },
]

const SAMPLE_PDF = "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF1"

const seedReports = [
    { titleEn: "January 2026",  titleAr: "يناير 2026",  type: "Monthly",   size: "2.4 MB",  downloadUrl: SAMPLE_PDF },
    { titleEn: "December 2025", titleAr: "ديسمبر 2025", type: "Annual",    size: "15.8 MB", downloadUrl: SAMPLE_PDF },
    { titleEn: "November 2025", titleAr: "نوفمبر 2025", type: "Monthly",   size: "2.1 MB",  downloadUrl: SAMPLE_PDF },
    { titleEn: "Q3 2025",       titleAr: "الربع الثالث 2025", type: "Quarterly", size: "5.3 MB",  downloadUrl: SAMPLE_PDF },
    { titleEn:"Q2 2025", titleAr:"الربع الثاني 2025", type:"Quarterly", size:"4.1 MB", downloadUrl: SAMPLE_PDF },
    { titleEn:"Q1 2025", titleAr:"الربع الاول 2025", type:"Quarterly", size:"3.9 MB", downloadUrl: SAMPLE_PDF },
    // تقارير إضافية
    { titleEn:"February 2026", titleAr:"فبراير 2026", type:"Monthly", size:"2.5 MB", downloadUrl: SAMPLE_PDF },
    { titleEn:"March 2026", titleAr:"مارس 2026", type:"Monthly", size:"2.6 MB", downloadUrl: SAMPLE_PDF },
]

const seedNotifications = [
    { messageAr: "تنبيه النظام: تجاوزت مستويات الكربون الحد المسموح به في القطاع أ", messageEn: "System Alert: Carbon levels exceeded the allowed limit in Sector A", color: "red",    read: false },
    { messageAr: "تحديث المشروع: اكتمال المرحلة الثانية من حديقة الطاقة الشمسية",   messageEn: "Project Update: Phase 2 of Solar Park completed",                  color: "green",  read: false },
    { messageAr: "تحسن ملحوظ في درجة الاستدامة خلال الربع الأخير",                   messageEn: "Significant improvement in sustainability score this quarter",       color: "green",  read: false },
    { messageAr: "تم استلام إشعار جديد",                                              messageEn: "New notification received",                                        color: "yellow", read: true  },
    // إشعارات إضافية
    { messageAr: "تذكير: تحديث بيانات المشروع", messageEn: "Reminder: Update project data", color: "yellow", read: false },
    { messageAr: "تنبيه: استهلاك الطاقة مرتفع",  messageEn: "Alert: High energy consumption", color: "red", read: false },
    { messageAr: "تمت الموافقة على تقرير جديد", messageEn: "New report approved", color: "green", read: false },
    { messageAr: "تحديث دوري للنظام", messageEn: "System periodic update", color: "yellow", read: false },
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
    }finally {
        await mongoose.disconnect()
        console.log("✅ Disconnected from MongoDB")
    }
}

seed()