import productUserRoute from '../routes/product-user.route.js';
import accountRoute from '../routes/account.route.js';
import categoryService from "../services/category.service.js";
export default function (app) {
  app.get("/", async function (req, res) {
    const categories = await categoryService.findAll();
    res.render("home.hbs", {
      categories,
    });
  })

  app.use('/products', productUserRoute);
  app.use('/account', accountRoute);
}