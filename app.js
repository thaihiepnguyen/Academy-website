import express from "express";
import { engine } from "express-handlebars";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Online Academy App listening at http://localhost:${PORT}`);
});
