import { Router } from "express"
import * as projServices from "./projects.services.js"
import { asyncHandler } from "../../utils/errorhandler/asyncHandler.js"
import authentication from "../../middleWare/authentication.middelware.js"

const router = Router()

router.get("/", authentication, asyncHandler(projServices.getAllProjects))
router.get("/sectors", authentication, asyncHandler(projServices.getSectors))      // ← قبل /:id
router.get("/:id", authentication, asyncHandler(projServices.getSingleProject))

export default router
