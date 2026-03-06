import { settingsModel } from "../../database/models/setting.model.js"

export const getSettings = async (req, res, next) => {
  const settings = await settingsModel.findOne({ adminEmail: req.user.email }).lean()
  return res.status(200).json({ success: true, result: settings ?? {} })
}

export const saveSettings = async (req, res, next) => {
  const settings = await settingsModel.findOneAndUpdate(
    { adminEmail: req.user.email },
    { ...req.body, adminEmail: req.user.email },
    { upsert: true, new: true }
  )
  return res.status(200).json({ success: true, message: "Settings saved", result: settings })
}




