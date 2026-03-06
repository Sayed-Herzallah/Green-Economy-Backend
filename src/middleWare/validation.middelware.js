export const validation = (schema) => {
    return (req, res, next) => {
      // =========== validation using joi ===============
        const data = { ...req.body, ...req.query, ...req.params }
        const result = schema.validate(data, { abortEarly: false })
        // =========== check error joi ===============
        if (result.error) {
            const errorMessages = result.error.details.map((obj) => obj.message)
            return res.status(400).json({ success: false, message: "Validation error", errorMessages })
        }

        return next()
    }
}
