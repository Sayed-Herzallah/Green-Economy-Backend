import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
    {
        name:{ type: String, required: true },
        sectorAr:{ type: String, required: true },  // e.g. "صناعي"
        sectorEn:    { type: String, required: true },  // e.g. "Industrial"
        statusAr:    { type: String, required: true },  // e.g. "متحسن"
        statusEn:    { type: String, required: true },  // e.g. "Improved"
        statusColor: { type: String, default: "green" }, // green | yellow | red
        progress:    { type: Number, min: 0, max: 100, default: 0 },
        isDeleted:   { type: Boolean, default: false },
    },
    { timestamps: true }
)

export const projectModel = mongoose.model("Project", projectSchema)
