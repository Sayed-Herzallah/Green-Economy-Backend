import { Router } from "express"
import * as notifServices from "./notifications.services.js"
import { asyncHandler } from "../../utils/errorhandler/asyncHandler.js"
import authentication from "../../middleWare/authentication.middelware.js"

const router = Router()

router.get("/", authentication, asyncHandler(notifServices.getAllNotifications))
router.patch("/mark-all-read", authentication, asyncHandler(notifServices.markAllRead))     // ← قبل /:id
router.patch("/:id/read", authentication, asyncHandler(notifServices.markOneRead))

export default router
