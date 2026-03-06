import { projectModel } from "../../database/models/project.model.js"

// GET /projects
export const getAllProjects = async (req, res, next) => {
  const projects = await projectModel.find({ isDeleted: false }).lean()
  return res.status(200).json({ success: true, result: projects })
}

// GET /sectors
export const getSectors = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    result: {
      ar: ["جميع القطاعات", "صناعي", "سكني", "تجاري", "نقل"],
      en: ["All Sectors", "Industrial", "Residential", "Commercial", "Transport"]
    }
  })
}

// GET /projects/:id
export const getSingleProject = async (req, res, next) => {
  const project = await projectModel.findOne({ _id: req.params.id, isDeleted: false }).lean()
  if (!project) return next(new Error("Project not found", { cause: 404 }))
  return res.status(200).json({ success: true, result: project })
}


