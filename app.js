import express from "express";
import { engine } from "express-handlebars";
import hbs_sections from "express-handlebars-sections";
import { dirname } from "path";
import { fileURLToPath } from "url";
import numeral from "numeral";

import productUserRoute from "./routes/product-user.route.js";
//setup
const app = express();
app.use("/public", express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    helpers: {
      section: hbs_sections(),
      format_number(val) {
        return numeral(val).format("0,0");
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/products", productUserRoute);

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Online Academy App listening at http://localhost:${PORT}`);
});
