import express from "express";
import coursesController from "../controllers/courses.controller.js";
import detailsController from "../controllers/details.controller.js";
import coursesService from "../services/courses.service.js";
const router = express.Router();

router.get("/byCat/:id", coursesController.findByCatId);

router.get("/search/", coursesController.fullTextSearch);

router.get('/detail/:id', coursesController.getDetailPage);

//router.post('/search', productController.fullTextSearch);
router.get("/:id", detailsController.findDetailOfCourse);

router.post("/:id", detailsController.sendReview);
router.post("/add/:id", async function (req, res) {
  console.log("lol");
  const courseId = req.params.id;
  const userId = res.locals.user.id;
  coursesService.rollInCourse(userId, courseId);
  const url = "/details/" + courseId;
  res.redirect(url);
  //res.redirect(req.headers.referer);
});
router.post("/del/:id", async function (req, res) {
  console.log("lol");
  const courseId = req.params.id;
  const userId = res.locals.user.id;
  coursesService.unrollInCourse(userId, courseId);
  const url = "/details/" + courseId;
  res.redirect(url);
  //res.redirect(req.headers.referer);
});
export default router;
