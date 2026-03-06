export const notFoundHandler = (req, res, next) => {
    return next(new Error(`Route not found: ${req.originalUrl}`, { cause: 404 }))
}
