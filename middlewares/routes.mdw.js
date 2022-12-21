import productUserRoute from '../routes/product-user.route.js';
import accountRoute from '../routes/account.route.js';
import coursesRoute from "../routes/courses.route.js";
export default function (app) {
  app.get("/", async function (req, res) {
    res.render("home.hbs", {
      isDefault: true,
    });
  });

  app.use("/account", accountRoute);
  app.use("/products", productUserRoute);
  app.use("/courses", coursesRoute);
}