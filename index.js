// import express from "express"
// import dotenv from "dotenv"
// import { bootstrap } from "./app.controller.js"
// // ======== Dotenv ========
// dotenv.config()

// const app = express()
// const port = process.env.PORT || 8000
// // ============ Connect database =============
// await bootstrap(app, express)

// app.listen(port, () => {
//     console.log(`✅ Green Economy Server running on port ${port}`)
// })
import express from "express";
import { bootstrap } from "./app.controller.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

await bootstrap(app, express);

export default app;