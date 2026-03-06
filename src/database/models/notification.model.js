import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema(
    {
        messageAr: { type: String, required: true },
        messageEn: { type: String, required: true },
        color:     { type: String, enum: ["red", "green", "yellow"], default: "green" },
        read:      { type: Boolean, default: false },
    },
    { timestamps: true }
)

export const notificationModel = mongoose.model("Notification", notificationSchema)
