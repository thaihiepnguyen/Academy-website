import productUserRoute from "../routes/product-user.route.js";
import accountRoute from "../routes/account.route.js";
import coursesRoute from "../routes/courses.route.js";
import adminRoute from "../routes/admin.route.js";
import lectureRoute from "../routes/lecture.route.js";
import coursesController from "../controllers/courses.controller.js";
import userService from "../services/user.service.js";

export default async function (app) {
  app.get("/", async function (req, res) {
    const user = req.session.authUser;
    const coursesTop5 = await coursesController.findTop5Courses();
    const coursesTop10Views = await coursesController.findTop10CoursesByView();
    const coursesTop3 = await coursesController.findTop3Courses();

    for (let i = 0; i < coursesTop5.length; i++) {
      let ratings = ["", "", "", "", ""];
      for (let j = 0; j < coursesTop5[i].rating; j++) {
        ratings[j] = "rating-color"; // rating-color is a css class.
      }
      coursesTop5[i].ratings = ratings;
      if (user != null) {
        const isActive = await userService.checkCourseInWatchList(user.id, coursesTop5[i].id);
        const isEnrolled = await userService.checkEnroll(user.id, coursesTop5[i].id)
        if (isActive.length > 0) {
          coursesTop5[i].check = true;
        }
        if (isEnrolled.length > 0) {
          coursesTop5[i].enroll = true;
        }
      }
    }
    for (let i = 0; i < coursesTop10Views.length; i++) {
      let ratings = ["", "", "", "", ""];
      for (let j = 0; j < coursesTop10Views[i].rating; j++) {
        ratings[j] = "rating-color"; // rating-color is a css class.
      }
      coursesTop10Views[i].ratings = ratings;
      if (user != null) {
        const isActive = await userService.checkCourseInWatchList(user.id, coursesTop10Views[i].id);
        const isEnrolled = await userService.checkEnroll(user.id, coursesTop10Views[i].id)
        if (isActive.length > 0) {
          coursesTop10Views[i].check = true;
        }
        if (isEnrolled.length > 0) {
          coursesTop10Views[i].enroll = true;
        }
      }
    }

    for (let i = 0; i < coursesTop3.length; i++) {
      let ratings = ["", "", "", "", ""];
      for (let j = 0; j < coursesTop3[i].rating; j++) {
        ratings[j] = "rating-color"; // rating-color is a css class.
      }
      coursesTop3[i].ratings = ratings;
      if(user != null) {
        const isActive = await userService.checkCourseInWatchList(user.id, coursesTop3[i].id);
        const isEnrolled = await userService.checkEnroll(user.id, coursesTop3[i].id)
        if (isActive.length > 0) {
          coursesTop3[i].check = true;
        }
        if (isEnrolled.length > 0) {
          coursesTop3[i].enroll = true;
        }
      }
    }


    res.render("home.hbs", {
      activeTagbarLayout: true,
      activeSliderLayout: true,
      // isDefault: true,
      coursesTop5: coursesTop5,
      coursesTop10Views: coursesTop10Views,
      coursesTop3: coursesTop3
    });
  });


  app.use("/account", accountRoute);
  app.use("/products", productUserRoute);
  app.use("/courses", coursesRoute);
  app.use("/admin", adminRoute);
  app.use("/details", coursesRoute);
  app.use("/lecture", lectureRoute);
}
