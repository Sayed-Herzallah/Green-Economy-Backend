import { notificationModel } from "../../database/models/notification.model.js"

function relativeTime(date) {
  const mins = Math.floor((Date.now() - new Date(date)) / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins} mins ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`
  return `${Math.floor(hrs / 24)} day(s) ago`
}

// GET /notifications
export const getAllNotifications = async (req, res, next) => {
  const notifications = await notificationModel.find().sort({ createdAt: -1 }).lean()
  const result = notifications.map(n => ({ ...n, id: n._id, time: relativeTime(n.createdAt) }))
  return res.status(200).json({ success: true, result })
}

// PATCH /notifications/mark-all-read
export const markAllRead = async (req, res, next) => {
  await notificationModel.updateMany({}, { read: true })
  return res.status(200).json({ success: true, message: "All notifications marked as read" })
}

// PATCH /notifications/:id/read
export const markOneRead = async (req, res, next) => {
  const notification = await notificationModel.findByIdAndUpdate(
    req.params.id, { read: true }, { new: true }
  )
  if (!notification) return next(new Error("Notification not found", { cause: 404 }))
  return res.status(200).json({ success: true, result: notification })
}

