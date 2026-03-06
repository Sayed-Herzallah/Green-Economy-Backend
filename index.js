import express from "express"
import dotenv from "dotenv"
import { bootstrap } from "./app.controller.js"
// ======== Dotenv ========
dotenv.config()

const app = express()
const port = process.env.PORT || 8000
// ============ Connect database =============
await bootstrap(app, express)

app.listen(port, () => {
    console.log(`✅ Green Economy Server running on port ${port}`)
})
