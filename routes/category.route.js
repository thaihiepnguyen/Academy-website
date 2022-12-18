import express from 'express';
import userService from "../services/user.service.js";
import accountController from "../controllers/account.controller.js";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

router.get('/byCat/:id', categoryController.findByCatId);
export default router;