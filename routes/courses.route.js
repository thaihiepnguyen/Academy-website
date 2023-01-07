import express from "express";
import productController from "../controllers/courses.controller.js";
import detailsController from "../controllers/details.controller.js";
import coursesService from "../services/courses.service.js";
const router = express.Router();

router.get("/byCat/:id", productController.findByCatId);

router.get("/search/", productController.fullTextSearch);

//router.post('/search', productController.fullTextSearch);
router.get("/:id", detailsController.findDetailOfCourse);

router.post("/:id", detailsController.sendReview);
router.post("/add/:id", async function (req, res) {
  //console.log("lol");
  if (res.locals.user != null) {
    const courseId = req.params.id;
    const userId = res.locals.user.id;
    coursesService.rollInCourse(userId, courseId);
    location.reload();
    const url = "/details/" + courseId;
    res.redirect(url);
  } else {
    const courseId = req.params.id;
    //coursesService.rollInCourse(userId, courseId);
    const url = "/details/" + courseId;
    res.redirect(url);
  }
});
router.post("/del/:id", async function (req, res) {
  //console.log("lol");
  if (res.locals.user != null) {
    const courseId = req.params.id;
    const userId = res.locals.user.id;
    coursesService.unrollInCourse(userId, courseId);
    const url = "/details/" + courseId;
    res.redirect(url);
  } else {
    const courseId = req.params.id;
    //coursesService.rollInCourse(userId, courseId);
    const url = "/details/" + courseId;
    res.redirect(url);
  }
});
export default router;
