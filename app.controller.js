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
app.use("/api/auth",          authRouter)
app.use("/api/dashboard",     dashboardRouter)
app.use("/api/projects",      projectsRouter)
app.use("/api/reports",       reportsRouter)
app.use("/api/notifications", notificationsRouter)
app.use("/api/settings",      settingsRouter)
    // ========== Error Handlers ==============
    // app.use("/{*path}", notFoundHandler)
    app.use(notFoundHandler)
    app.use(globalErrorHandler)
}
