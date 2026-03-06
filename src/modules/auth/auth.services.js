import { generateToken } from "../../utils/security/Token/tokenAuth.js"

// ===================== Login (Admin only from .env) =====================
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body

    // بنقارن مباشرة مع الـ .env - مفيش داتابيز للأدمن
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return next(new Error("Invalid email or password", { cause: 401 }))
    }

    const payload = { email, role: "admin" }

    const AccessToken  = generateToken({ payload, options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE } })

    return res.status(200).json({
        success: true,
        message: "Login successful",
        result: { AccessToken }
    })
}
