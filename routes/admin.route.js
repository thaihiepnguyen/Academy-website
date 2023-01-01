import express from "express";

import adminController from "../controllers/admin.controller.js";

const router = express.Router();
router.get("/categories", adminController.getCategories);
router.get("/categories/add", adminController.getAddCategories);
router.post("/categories/add", adminController.postAddCategories);
router.get("/categories/edit", adminController.editCategories);
router.post("/categories/del", adminController.delCategories);
router.post("/categories/patch", adminController.patchCategories);

export default router;
