import { engine } from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
export default function (app) {
  app.engine(
      "hbs",
      engine({
        extname: "hbs",
        helpers: {
          section: hbs_sections(),
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
  app.set('view engine', 'hbs');
  app.set('views', './views');
}