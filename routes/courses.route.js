import express from "express";
import coursesController from "../controllers/courses.controller.js";
import detailsController from "../controllers/details.controller.js";
import coursesService from "../services/courses.service.js";
const router = express.Router();
<<<<<<< HEAD
router.get('/enroll/:id', coursesController.enrollCourses);
=======
router.get("/lecturerCourse/:id", detailsController.findDetailOfLectureCourse);
>>>>>>> be6efac1e0984fde36944d66c0888dfaffe1e12f

router.get('/detail/:id', coursesController.getDetailPage);
router.get("/byCat/:id", coursesController.findByCatId);

router.get("/search/", coursesController.fullTextSearch);

<<<<<<< HEAD
=======
router.get("/detail/:id", coursesController.getDetailPage);
>>>>>>> be6efac1e0984fde36944d66c0888dfaffe1e12f

router.get("/:id", detailsController.findDetailOfCourse);

router.get("/:courseId/:videoId", detailsController.viewClip);

router.post("/:id", detailsController.sendReview);

router.post("/views/:id", coursesController.pushView);

<<<<<<< HEAD

=======
router.get("/enroll/:id", coursesController.enrollCourses);
>>>>>>> be6efac1e0984fde36944d66c0888dfaffe1e12f

router.post("/add/:id", async function (req, res) {
  //console.log("lol");
  if (res.locals.user != null) {
    const courseId = req.params.id;
    const userId = res.locals.user.id;
    coursesService.rollInCourse(userId, courseId);
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
