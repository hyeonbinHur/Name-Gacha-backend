import express from "express";
import controller from "../controller/projectController.js";

const router = express.Router();
router.get("/projects", controller.get_projects);

router.get("/project/:uuid", controller.get_project);
router.post("/project", controller.create_project);
router.put("/project/:projectId", controller.update_project);
router.delete("/project/:projectId", controller.delete_project);
export default router;
