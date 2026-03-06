import { Router } from "express"
import * as settServices from "./settings.services.js"
import { asyncHandler } from "../../utils/errorhandler/asyncHandler.js"
import authentication from "../../middleWare/authentication.middelware.js"

const router = Router()

router.get("/",  authentication, asyncHandler(settServices.getSettings))   // ← مضاف
router.post("/", authentication, asyncHandler(settServices.saveSettings))

export default router