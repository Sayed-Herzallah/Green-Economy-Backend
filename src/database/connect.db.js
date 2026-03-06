import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_URL)
        console.log("✅ DataBase connected successfully")
    } catch (error) {
        // ⚠️ مش بنوقف السيرفر - الـ services عندها fallback data
        console.warn("⚠️  DataBase connection failed (using fallback data):", error.message)
    }
}

export default connectDB

