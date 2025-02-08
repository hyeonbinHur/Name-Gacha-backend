import express from "express";
import controller from "../controller/functionController.js";
const router = express.Router();
router.get("/function/:functionId", controller.get_function);
router.get("/functions", controller.get_functions);
router.post("/function", controller.create_function);
router.put("/function/:functionId", controller.update_function);
router.delete("/function_inpage/:pageId", controller.delete_function_inpage);
router.delete(
  "/function_certain/:functionId",
  controller.delete_function_certain
);
export default router;
