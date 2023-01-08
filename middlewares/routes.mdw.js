import productUserRoute from "../routes/product-user.route.js";
import accountRoute from "../routes/account.route.js";
import coursesRoute from "../routes/courses.route.js";
import adminRoute from "../routes/admin.route.js";
import coursesController from "../controllers/courses.controller.js";
import userService from "../services/user.service.js";

export default function (app) {
  app.get("/", async function (req, res) {
    const courses = await coursesController.findTop5Courses();

    const user = res.locals.user;


    if (courses == null) {
      res.render("home", {
        warning: `Can not find any courses`,
      });
      return;
    }

    for (let i = 0; i < courses.length; i++) {
      let ratings = ["", "", "", "", ""];
      for (let j = 0; j < courses[i].rating; j++) {
        ratings[j] = "rating-color"; // rating-color is a css class.
      }
      courses[i].ratings = ratings;
      if(user != null) {
        const isActive = await userService.checkCourseInWatchList(user.id, courses[i].id);
        if (isActive.length > 0) {
          courses[i].check = true;
        }
      }
    }

    res.render("home.hbs", {
      activeTagbarLayout: true,
      activeSliderLayout: true,
      courses,
    });
  });

  app.use("/account", accountRoute);
  app.use("/products", productUserRoute);
  app.use("/courses", coursesRoute);
  app.use("/admin", adminRoute);
  app.use("/details", coursesRoute);
}
