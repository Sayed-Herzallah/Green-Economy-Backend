import mongoose from "mongoose"

const statsSchema = new mongoose.Schema(
    {
        carbonEmissions:    { type: Number, required: true },  // tons
        renewableEnergy:    { type: Number, required: true },  // %
        waterConsumption:   { type: Number, required: true },  // m³
        sustainabilityScore:{ type: Number, required: true },  // /100
        month:              { type: String, required: true },  // e.g. "Jan"
        year:               { type: Number, required: true },  // e.g. 2026
    },
    { timestamps: true }
)

export const statsModel = mongoose.model("Stats", statsSchema)
