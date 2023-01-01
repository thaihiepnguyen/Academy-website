import categoryService from "../services/category.service.js";
import courseService from "../services/courses.service.js";


export default {
    getCategories: async (req, res) => {
        const list = await categoryService.findAll();

        res.render("vwAdmin/vwCategory/index", {
            activeTagbarLayout: true,
            categories: list,
        });
    },

    getAddCategories: (req, res) => {
        res.render("vwAdmin/vwCategory/add", {
            activeTagbarLayout: true,
        });
    },

    postAddCategories: async (req, res) => {
        const ret = await categoryService.add(req.body);
        res.render("vwAdmin/vwCategory/add", {
            activeTagbarLayout: true,
        });
    },

    editCategories: async (req, res) => {
        const id = req.query.id || 0;
        const category = await categoryService.findById(id);

        if (category === null) {
            return res.redirect("/admin/categories");
        }
        res.render("vwAdmin/vwCategory/edit", {
            activeTagbarLayout: true,
            category,
        });
    },
    delCategories: async (req, res) => {
        const id = req.body.id || 0;
        const courseList = await courseService.findByCatId(id);
        req.session.flag = false;
        if (courseList === null) {
            const ret = await categoryService.del(id);
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
    },
    patchCategories: async (req, res) => {
        const ret = await categoryService.patch(req.body);
        res.redirect("/admin/categories");
    }
}