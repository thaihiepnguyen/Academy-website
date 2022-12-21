import express from "express";
import bodyParser from "body-parser";
import viewMdw from "./middlewares/view.mdw.js";
import localsMdw from "./middlewares/locals.mdw.js";
import routesMdw from "./middlewares/routes.mdw.js";
import sessionMdw from "./middlewares/session.mdw.js";

const app = express();

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

sessionMdw(app);
localsMdw(app);
viewMdw(app);
routesMdw(app);

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
