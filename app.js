import express from "express";
import bodyParser from "body-parser";

import activate_session from './middlewares/session.mdw.js';
import activate_views from './middlewares/view.mdw.js';
import activate_resLocals from './middlewares/locals.mdw.js';
import activate_routes from './middlewares/routes.mdw.js';
import activate_error_handlers from './middlewares/error.mdw.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

activate_session(app);
activate_views(app);
activate_resLocals(app);
activate_routes(app);
//activate_error_handlers(app);

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
