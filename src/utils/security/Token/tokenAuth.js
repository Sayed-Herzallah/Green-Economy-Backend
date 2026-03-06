import jsonwebtoken from "jsonwebtoken"

export const generateToken = ({ payload, options = {} }) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, options)
}

export const verifyToken = ({ token }) => {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET)
}
