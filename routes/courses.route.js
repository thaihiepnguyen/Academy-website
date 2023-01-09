import express from "express";
import coursesController from "../controllers/courses.controller.js";
import detailsController from "../controllers/details.controller.js";
import coursesService from "../services/courses.service.js";
import authWithRequiredPermission from "../middlewares/auth.mdw.js";
const router = express.Router();

router.get("/detail/:id", coursesController.getDetailPage);

router.get("/byCat/", coursesController.findByCatId);

router.get("/search/", coursesController.fullTextSearch);

router.get(
  "/enroll/:id",
  authWithRequiredPermission(0),
  coursesController.enrollCourses
);

router.get("/byTopic/", coursesController.findByTopicId);

router.get("/:courseId/:videoId", detailsController.viewClip);

router.post("/:id", detailsController.sendReview);

router.post("/views/:id", coursesController.pushView);
router.get("/:id", detailsController.findDetailOfCourse);
router.post(
  "/add/:id",
  authWithRequiredPermission(0),
  async function (req, res) {
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
  }
);
router.post(
  "/del/:id",
  authWithRequiredPermission(0),
  async function (req, res) {
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
  }
);
export default router;
