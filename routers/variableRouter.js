import express from "express";
import controller from "../controller/variableController.js";

const router = express.Router();

//이하 사용 안함
// router.get("/variable/:varId", controller.get_variable);
// router.get("/variables", controller.get_variables);
// router.delete("/variable_inpage/:pageId", controller.delete_variable_inpage);

//이하 사용함
router.post("/variable", controller.create_variable);
router.put("/variable/:varId", controller.update_variable);
router.delete("/variable/:varId", controller.delete_variable_certain);

export default router;
