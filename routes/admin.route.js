import express from "express";
import bcrypt from "bcryptjs";

import adminController from "../controllers/admin.controller.js";
import categoryModel from "../services/category.service.js";
import courseModel from "../services/courses.service.js";
import userModel from "../services/user.service.js";
import topicModel from "../services/topic.service.js";
import { Console } from "console";

const router = express.Router();
//=================================================MANAGE CATEGORY=================================================
//=================================================================================================================
router.get("/categories", async function (req, res) {
	const listCategory = await categoryModel.findAll();
	const listTopic = await topicModel.findAll();
	res.render("vwAdmin/vwCategory/index", {
		activeTagbarLayout: true,
		categories: listCategory,
		topics: listTopic,
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
router.post("/categories/del/:id", async function (req, res) {
	const idRaw = req.params.id || 0;
	console.log(typeof idRaw);

	const id = parseInt(idRaw);
	const courseList = await courseModel.findByCatId(id);

	console.log(courseList);
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
	let listCourse;
	if (req.query.cat) {
		listCourse = await courseModel.findCoursesByCatName(req.query.cat);
	} else if (req.query.lecturer) {
		const firstname = req.query.lecturer.split(" ")[0];
		const lastname = req.query.lecturer.split(" ")[1];
		listCourse = await courseModel.findCoursesByLecturerName(firstname, lastname);
	} else {
		listCourse = await courseModel.findAll();
	}
	const listCategory = await categoryModel.findAll();
	const listLecturer = await userModel.findLecturer();
	res.render("vwAdmin/vwCourse/index", {
		activeTagbarLayout: true,
		courses: listCourse,
		categories: listCategory,
		users: listLecturer,
	});
});
router.post("/courses/lock/:id", async function (req, res) {
	await courseModel.lockCourse(+req.params.id);
	res.redirect("/admin/courses");
});
router.post("/courses/unlock/:id", async function (req, res) {
	await courseModel.unlockCourse(+req.params.id);
	res.redirect(req.headers.referer);
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
		req.session.err_message = "Email is existed.";
		req.session.flag = true;
		res.redirect(req.headers.referer);
	}
});
router.get("/users/edit", async function (req, res) {
	const id = req.query.id || 0;
	const User = await userModel.findById(id);

	if (User === null) {
		return res.redirect("/admin/users");
	}
	res.render("vwAdmin/vwUser/edit", {
		activeTagbarLayout: true,
		User,
	});
});
router.post("/users/patch", async function (req, res) {
	const ret = await userModel.patch(req.body);
	res.redirect("/admin/users");
});
router.post("/users/del/:id", async function (req, res) {
	const ret = await userModel.del(+req.params.id);
	res.redirect(req.headers.referer);
});
router.post("/users/lock/:id", async function (req, res) {
	await userModel.lockUser(+req.params.id);
	res.redirect("/admin/users");
});
router.post("/users/unlock/:id", async function (req, res) {
	await userModel.unlockUser(+req.params.id);
	res.redirect(req.headers.referer);
});

export default router;
