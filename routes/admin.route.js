import express from "express";
import bcrypt from "bcryptjs";

import adminController from "../controllers/admin.controller.js";
import categoryModel from "../services/category.service.js";
import courseModel from "../services/courses.service.js";
import userModel from "../services/user.service.js";

const router = express.Router();
//=================================================MANAGE CATEGORY=================================================
//=================================================================================================================
router.get("/categories", async function (req, res) {
	const list = await categoryModel.findAll();

	res.render("vwAdmin/vwCategory/index", {
		activeTagbarLayout: true,
		categories: list,
	});
});
router.get("/categories/add", function (req, res) {
	res.render("vwAdmin/vwCategory/add", {
		activeTagbarLayout: true,
	});
});
router.post("/categories/add", async function (req, res) {
	const ret = await categoryModel.add(req.body);
	res.render("vwAdmin/vwCategory/add", {
		activeTagbarLayout: true,
	});
});
router.get("/categories/edit", async function (req, res) {
	const id = req.query.id || 0;
	const category = await categoryModel.findById(id);

	if (category === null) {
		return res.redirect("/admin/categories");
	}
	res.render("vwAdmin/vwCategory/edit", {
		activeTagbarLayout: true,
		category,
	});
});
router.post("/categories/del", async function (req, res) {
	const id = req.body.id || 0;
	const courseList = await courseModel.findByCatId(id);
	req.session.flag = false;
	if (courseList === null) {
		const ret = await categoryModel.del(id);
		return res.redirect("/admin/categories");
	} else {
		req.session.err_message = "This category has coures, not allowed to be removed.";
		req.session.flag = true;
		res.redirect(req.headers.referer);
	}
});
router.post("/categories/patch", async function (req, res) {
	const ret = await categoryModel.patch(req.body);
	res.redirect("/admin/categories");
});
//=================================================MANAGE COURSE=================================================
//===============================================================================================================
router.get("/courses", async function (req, res) {
	const list = await courseModel.findAll();
	res.render("vwAdmin/vwCourse/index", {
		activeTagbarLayout: true,
		courses: list,
	});
});
router.post("/courses/del", async function (req, res) {
	const ret = await courseModel.del(+req.body.id);
	res.redirect(req.headers.referer);
});
//=================================================MANAGE USER===================================================
//===============================================================================================================
router.get("/users", async function (req, res) {
	res.render("vwAdmin/vwUser/index", {
		activeTagbarLayout: true,
	});
});
router.get("/users/add", function (req, res) {
	res.render("vwAdmin/vwUser/add", {
		activeTagbarLayout: true,
	});
});
router.post("/users/add", async function (req, res) {
	//const ret = await userModel.add(req.body);
	const rawPassword = req.body.password;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(rawPassword, salt);
	req.body.password = hash;

	const user = {
		...req.body,
		image: null,
		role_id: 2,
	};
	const entity = await userModel.findAll();
	let isEmailExists = false;
	for (let item of entity) {
		if (item.email === user.email) {
			isEmailExists = true;
		}
	}

	if (!isEmailExists) {
		await userModel.add(user);
		res.render("vwAdmin/vwUser/add", {
			activeTagbarLayout: true,
		});
	} else {
		// res.render("vwSignup/signup", {
		// 	message: "Email is existed",
		// 	isDefault: true,
		// });

		req.session.err_message = "Email is existed.";
		req.session.flag = true;
		res.redirect(req.headers.referer);
	}
});
export default router;
