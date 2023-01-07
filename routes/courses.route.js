import express from "express";
import coursesController from "../controllers/courses.controller.js";
import detailsController from "../controllers/details.controller.js";
const router = express.Router();

router.get("/byCat/:id", coursesController.findByCatId);

router.get("/search/", coursesController.fullTextSearch);

router.get('/detail/:id', coursesController.getDetailPage);

//router.post('/search', productController.fullTextSearch);
router.get("/:id", detailsController.findDetailOfCourse);

router.post("/:id", detailsController.sendReview);

export default router;
