import { verifyToken } from "../utils/security/Token/tokenAuth.js"

const authentication = (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return next(new Error("Token not found - please login first", { cause: 401 }))
        }

        req.user = verifyToken({ token: authorization })
        return next()

    } catch (error) {
        return next(new Error("Invalid or expired token", { cause: 401 }))
    }
}

export default authentication