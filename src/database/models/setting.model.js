import mongoose from "mongoose"

const settingsSchema = new mongoose.Schema(
  {
    adminEmail: { type: String, default: "" },
    lang:       { type: String, enum: ["ar", "en"], default: "ar" },
    theme:      { type: String, enum: ["light", "dark"], default: "light" },
    name:       { type: String, default: "Admin" },
  },
  { timestamps: true }
)

export const settingsModel = mongoose.model("Settings", settingsSchema)