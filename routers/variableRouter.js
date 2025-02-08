import express from "express";
import controller from "../controller/variableController.js";

const router = express.Router();
router.get("/variable/:varId", controller.get_variable);
router.get("/variables", controller.get_variables);
router.post("/variable", controller.create_variable);
router.put("/variable/:varId", controller.update_variable);
router.delete("/variable_inpage/:pageId", controller.delete_variable_inpage);
router.delete("/variable_certain/:varId", controller.delete_variable_certain);
export default router;
