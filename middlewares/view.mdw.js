import { engine } from 'express-handlebars';
import hbs_sections from "express-handlebars-sections";
import numeral from "numeral";
export default function(app) {
	// template engine
	app.engine('.hbs', engine({
		extname: '.hbs',
		helpers: {
			section: hbs_sections(),
			format_number(val) {
				return numeral(val).format("0,0");
			},
			isEqual(val1, val2) {
				return val1 === val2;
			},
			isNotEqual(val1, val2) {
				return val1 !== val2;
			},
		}
	}));
	app.set('view engine', '.hbs');
	app.set('views', './views');
}
