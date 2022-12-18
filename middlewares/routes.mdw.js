import productUserRoute from '../routes/product-user.route.js';
import accountRoute from '../routes/account.route.js';
import productRoute from "../routes/product.route.js";
export default function (app) {
  app.get("/", async function (req, res) {
    // res.send('Hello World.');
    res.render("home.hbs");
  });

  app.use("/account", accountRoute);

//app.get('/login', function (req, res) {
//  const __dirname = dirname(fileURLToPath(import.meta.url));
//  res.sendFile(__dirname + '/views/layouts/bs4');
//})
  app.use("/products", productUserRoute);
  app.use("/courses", productRoute);
}