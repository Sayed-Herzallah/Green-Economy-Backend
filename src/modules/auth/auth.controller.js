import { Router } from "express"
import * as authServices from "./auth.services.js"
import { validation } from "../../middleWare/validation.middelware.js"
import { loginSchema } from "./auth.validation.js"
import { asyncHandler } from "../../utils/errorhandler/asyncHandler.js"

const router = Router()

// POST /auth/login
router.post("/login",
  validation(loginSchema),
  asyncHandler(authServices.loginUser)
)

export default router
