import { Router } from "express"
import * as dashServices from "./dashboard.services.js"
import { asyncHandler } from "../../utils/errorhandler/asyncHandler.js"
import authentication from "../../middleWare/authentication.middelware.js"

const router = Router()

router.get("/stats", authentication, asyncHandler(dashServices.getStats))
router.get("/chart", authentication, asyncHandler(dashServices.getChart))
router.get("/sectors", authentication, asyncHandler(dashServices.getSectors))
router.get("/ai-insight", authentication, asyncHandler(dashServices.getAiInsight))

export default router
