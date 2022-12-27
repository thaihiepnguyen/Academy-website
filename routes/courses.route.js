import express from "express";
import productController from "../controllers/courses.controller.js";
import detailsController from "../controllers/details.controller.js";
const router = express.Router();

router.get("/byCat/:id", productController.findByCatId);

router.get("/search/", productController.fullTextSearch);

//router.post('/search', productController.fullTextSearch);
router.get("/:id", detailsController.findDetailOfCourse);
router.post("/:id", detailsController.sendReview);
export default router;
