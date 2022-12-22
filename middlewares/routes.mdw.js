import productUserRoute from '../routes/product-user.route.js';
import accountRoute from '../routes/account.route.js';
import coursesRoute from "../routes/courses.route.js";
import coursesService from "../services/courses.service.js";
export default function (app) {
  app.get("/", async function (req, res) {
    const courses = await coursesService.findTop5Courses();

    if (courses == null) {
      res.render('home',{
        warning: `Can not find any courses`
      });
      return;
    }

    for (let i = 0; i < courses.length; i++) {
      let ratings = ["", "", "", "", ""];
      for (let j = 0; j < courses[i].rating; j++) {
        ratings[j] = "rating-color";
      }
      courses[i].ratings = ratings;
    }

    console.error(res.locals.user);

    res.render("home.hbs", {
      activeTagbarLayout: true,
      activeSliderLayout: true,
      courses
    });
  });

  app.use("/account", accountRoute);
  app.use("/products", productUserRoute);
  app.use("/courses", coursesRoute);
}