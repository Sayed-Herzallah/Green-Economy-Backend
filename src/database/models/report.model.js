import mongoose from "mongoose"

const reportSchema = new mongoose.Schema(
    {
        titleEn:     { type: String, required: true },  // e.g. "January 2026"
        titleAr:     { type: String, required: true },  // e.g. "يناير 2026"
        type:        { type: String, enum: ["Monthly", "Annual", "Quarterly"], default: "Monthly" },
        size:        { type: String, default: "0 MB" },
        downloadUrl: { type: String, default: null },    // رابط الملف لو موجود
        isDeleted:   { type: Boolean, default: false },
    },
    { timestamps: true }
)

export const reportModel = mongoose.model("Report", reportSchema)
