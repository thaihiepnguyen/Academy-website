import categoryService from "../services/category.service.js";
import topicService from "../services/topic.service.js";
export default function (app) {
	app.use(async function (req, res, next) {
		if (typeof req.session.key !== "undefined") {
			res.locals.key = req.session.key;
		}
		res.locals.active_pf = "";
		res.locals.active_pt = "";
		res.locals.active_sc = "";
		res.locals.active_wl = "";
		res.locals.active_rc = "";
		res.locals.active_lg = "";
		res.locals.flag = req.session.flag;
		res.locals.err_message = req.session.err_message;
		next();
	});
	app.use(async function (req, res, next) {
		const topic = await topicService.findAll();
		res.locals.topic = topic;
		next();
	});
	app.use(async function (req, res, next) {
		const categories = await categoryService.findAll();

		// add an array of topics into each category.
		for (let category of categories) {
			let arrayOfTopic = [];
			for (let item of res.locals.topic) {
				if (category.id === item.field_id) {
					arrayOfTopic.push(item);
				}
			}
			category.topic = arrayOfTopic;
		}

		res.locals.categories = categories;
		next();
	});

	app.use(async function (req, res, next) {
		if (typeof req.session.auth === "undefined") {
			req.session.auth = false;
		}

		if (typeof req.session.authUser === "undefined") {
			req.session.authUser = null;
		}

		if (req.session.auth) {
			if (req.session.authUser.image === null) {
				req.session.authUser.image = "/imgs/avt/0.png";
			}
			res.locals.auth = req.session.auth;
			res.locals.user = req.session.authUser;
		} else {
			res.locals.auth = false;
			res.locals.user = null;
		}
		next();
	});
}
