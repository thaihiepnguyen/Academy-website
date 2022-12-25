import express from 'express';
import productController from "../controllers/courses.controller.js";

const router = express.Router();

router.get('/byCat/:id', productController.findByCatId);

router.get('/search/', productController.fullTextSearch);

//router.post('/search', productController.fullTextSearch);
export default router;