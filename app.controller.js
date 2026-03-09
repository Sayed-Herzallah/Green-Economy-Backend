import cors from "cors"
import connectDB              from "./src/database/connect.db.js"
import { notFoundHandler }    from "./src/utils/errorhandler/notFoundHandler.js"
import { globalErrorHandler } from "./src/utils/errorhandler/globalErrorHandler.js"
import authRouter             from "./src/modules/auth/auth.controller.js"
import dashboardRouter        from "./src/modules/dashboard/dashboard.controller.js"
import projectsRouter         from "./src/modules/projects/projects.controller.js"
import reportsRouter          from "./src/modules/reports/reports.controller.js"
import notificationsRouter    from "./src/modules/notifications/notifications.controller.js"
import settingsRouter         from "./src/modules/settings/settings.controller.js"
export const bootstrap = async (app, express) => {
    app.use(express.json())
    app.use(cors())

    await connectDB()

    // ========== Routers ==============
app.use("/auth",          authRouter)
app.use("/dashboard",     dashboardRouter)
app.use("/projects",      projectsRouter)
app.use("/reports",       reportsRouter)
app.use("/notifications", notificationsRouter)
app.use("/settings",      settingsRouter)
    // ========== Error Handlers ==============
    // app.use("/{*path}", notFoundHandler)
    app.use(notFoundHandler)
    app.use(globalErrorHandler)
}
