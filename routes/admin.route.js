import express from "express";
import categoryModel from "../services/category.service.js";
import courseModel from "../services/courses.service.js";

const router = express.Router();
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
		// res.locals.lcErr_message = "This category has coures, not allowed to be removed.";
		// console.log("hello world");
		req.session.err_message = "This category has coures, not allowed to be removed.";
		req.session.flag = true;
		res.redirect(req.headers.referer);
		// res.render("vwAdmin/vwCategory/edit", {
		// 	activeTagbarLayout: true,
		// 	err_message: "This category has coures, not allowed to be removed.",
		// });
	}
});
router.post("/categories/patch", async function (req, res) {
	const ret = await categoryModel.patch(req.body);
	res.redirect("/admin/categories");
});
export default router;
