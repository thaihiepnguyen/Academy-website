import express from 'express';
import accountService from "../services/account.service.js";
import bcrypt from "bcrypt";
import categoryService from "../services/category.service.js";
import topicService from "../services/topic.service.js";
import coursesService from "../services/courses.service.js";

const router = express.Router();

router.get("/categories", async function (req, res) {
    const categories = await categoryService.findAll();
    const topics = await topicService.findAll();
    res.render("vwAdmin/vwCategory/index", {
        categories,
        topics,
    });
});
router.get("/categories/add", function (req, res) {
    res.render("vwAdmin/vwCategory/add");
});
router.post("/categories/add", async function (req, res) {
    const category = req.body;
    await categoryService.add(category);

    res.redirect('/admin/categories');
});
router.get("/categories/edit", async function (req, res) {
    const id = req.query.id || 0;
    const category = await categoryService.findById(id);

    if (category === null) {
        return res.redirect("/admin/categories");
    }
    res.render("vwAdmin/vwCategory/edit", {
        category,
    });
});
router.post("/categories/del/:id", async function (req, res) {
    const idRaw = req.params.id || 0;

    const id = parseInt(idRaw);
    const courseList = await coursesService.findByCatId(id);

    req.session.flag = false;
    if (courseList === null) {
        const ret = await categoryService.del(id);
        return res.redirect("/admin/categories");
    } else {
        req.session.err_message = "This category has coures, not allowed to be removed.";
        req.session.flag = true;
        res.redirect(req.headers.referer);
    }
});
router.post("/categories/patch", async function (req, res) {
    await categoryService.patch(req.body);
    res.redirect("/admin/categories");
});

router.get("/categories/topics/add", async function (req, res) {
    const categories = await categoryService.findAll();
    res.render("vwAdmin/vwCategory/add_topic", {
        categories
    });
});
router.post("/categories/topics/add", async function (req, res) {
    await topicService.add(req.body);
    res.redirect('/admin/categories');
});
router.get("/categories/topics/edit", async function (req, res) {
    const categories = await categoryService.findAll();
    const id = req.query.id || 0;
    const topic = await topicService.findById(id);

    if (topic === null) {
        return res.redirect("/admin/categories");
    }
    res.render("vwAdmin/vwCategory/edit_topic", {
        categories,
        topic,
    });

    router.post("/categories/topics/patch", async function (req, res) {
        await topicService.patch(req.body);
        res.redirect("/admin/categories");
    });

    router.post("/categories/topics/del/:id", async function (req, res) {
        const ret = await topicService.del(+req.params.id);
        res.redirect(req.headers.referer);
    });
});
//=================================================MANAGE COURSE=================================================
//===============================================================================================================
// router.get("/courses", async function (req, res) {
//     let listCourse;
//     if (req.query.cat) {
//         listCourse = await courseModel.findCoursesByCatName(req.query.cat);
//     } else if (req.query.lecturer) {
//         const firstname = req.query.lecturer.split(" ")[0];
//         const lastname = req.query.lecturer.split(" ")[1];
//         listCourse = await courseModel.findCoursesByLecturerName(firstname, lastname);
//     } else {
//         listCourse = await courseModel.findAll();
//     }
//     const listCategory = await categoryModel.findAll();
//     const listLecturer = await userModel.findLecturer();
//     res.render("vwAdmin/vwCourse/index", {
//         activeTagbarLayout: true,
//         courses: listCourse,
//         categories: listCategory,
//         users: listLecturer,
//     });
// });
// router.post("/courses/lock/:id", async function (req, res) {
//     await coursesService.lockCourse(+req.params.id);
//     res.redirect("/admin/courses");
// });
// router.post("/courses/unlock/:id", async function (req, res) {
//     await coursesService.unlockCourse(+req.params.id);
//     res.redirect(req.headers.referer);
// });
// router.post("/courses/del", async function (req, res) {
//     const ret = await coursesService.del(+req.body.id);
//     res.redirect(req.headers.referer);
// });
//
// //=================================================MANAGE USER===================================================
// //===============================================================================================================
router.get("/users", async function (req, res) {
    const users = await accountService.findAll();
    res.render("vwAdmin/vwUser/index", {
        users
    });
});
// router.get("/users/add", function (req, res) {
//     res.render("vwAdmin/vwUser/add", {
//         activeTagbarLayout: true,
//     });
// });
// router.post("/users/add", async function (req, res) {
//     const rawPassword = req.body.password;
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(rawPassword, salt);
//     req.body.password = hash;
//
//     const user = {
//         ...req.body,
//         image: null,
//         role_id: 2,
//     };
//     const entity = await accountService.findAll();
//     let isEmailExists = false;
//     for (let item of entity) {
//         if (item.email === user.email) {
//             isEmailExists = true;
//         }
//     }
//
//     if (!isEmailExists) {
//         await accountService.add(user);
//         res.render("vwAdmin/vwUser/add", {
//             activeTagbarLayout: true,
//         });
//     } else {
//         req.session.err_message = "Email is existed.";
//         req.session.flag = true;
//         res.redirect(req.headers.referer);
//     }
// });
// router.get("/users/edit", async function (req, res) {
//     const id = req.query.id || 0;
//     const User = await accountService.findById(id);
//
//     if (User === null) {
//         return res.redirect("/admin/users");
//     }
//     res.render("vwAdmin/vwUser/edit", {
//         activeTagbarLayout: true,
//         User,
//     });
// });
// router.post("/users/patch", async function (req, res) {
//     const ret = await accountService.patch(req.body);
//     res.redirect("/admin/users");
// });
// router.post("/users/del/:id", async function (req, res) {
//     const ret = await accountService.del(+req.params.id);
//     res.redirect(req.headers.referer);
// });
// router.post("/users/lock/:id", async function (req, res) {
//     await accountService.lockUser(+req.params.id);
//     res.redirect("/admin/users");
// });
// router.post("/users/unlock/:id", async function (req, res) {
//     await accountService.unlockUser(+req.params.id);
//     res.redirect(req.headers.referer);
// });

export default router;