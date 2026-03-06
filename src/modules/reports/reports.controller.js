import { Router } from "express"
import * as repServices from "./reports.services.js"
import { asyncHandler } from "../../utils/errorhandler/asyncHandler.js"
import authentication from "../../middleWare/authentication.middelware.js"

const router = Router()

router.get("/", authentication, asyncHandler(repServices.getAllReports))
router.get("/ai-summary", authentication, asyncHandler(repServices.getAiSummary))   // ← قبل /:id
router.get("/:id/download", authentication, asyncHandler(repServices.downloadReport))
export default router
