import express from "express";
import { engine } from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import accountRoute from "./routes/account.route.js";
import productUserRoute from "./routes/product-user.route.js";
import categoryService from "./services/category.service.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    helpers: {
      renderStars(rating) {
        let result = "";
        for (let i = 1; i <= 5; i++) {
          let checked = rating >= i ? " checked" : "";
          result += `<span class='fa fa-star${checked}'></span>`;
        }
        return result;
      },
      breaklines(text) {
        text = Handlebars.Utils.escapeExpression(text);
        text = text.replace(/(\r\n|\n|\r)/gm, "<br>");
        return new Handlebars.SafeString(text);
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", async function (req, res) {
  const categories = await categoryService.findAll();
  // res.send('Hello World.');
  res.render("home.hbs", {
    categories,
  });
});

app.use("/account", accountRoute);

//app.get('/login', function (req, res) {
//  const __dirname = dirname(fileURLToPath(import.meta.url));
//  res.sendFile(__dirname + '/views/layouts/bs4');
//})
app.use("/products", productUserRoute);

//helper
// ExpressHandlebars.registerHelper("renderStars", (rating) => {
//   let result = "";
//   for (let i = 1; i <= 5; i++) {
//     let checked = rating >= i ? " checked" : "";
//     result += `<span class='fa fa-star${checked}'></span>`;
//   }
//   return new ExpressHandlebars.SafeString(result);
// });
// Handlebars.registerHelper("breaklines", function (text) {
//   text = Handlebars.Utils.escapeExpression(text);
//   text = text.replace(/(\r\n|\n|\r)/gm, "<br>");
//   return new Handlebars.SafeString(text);
// });
const PORT = 3000;
app.listen(PORT, function () {
  console.log(`E-Commerce App listening at http://localhost:${PORT}`);
});
