import express from 'express';
import accountService from "../services/account.service.js";
import bcrypt from "bcrypt";
import topicService from "../services/topic.service.js";
import multer from "multer";
import fs from 'fs';
import coursesService from "../services/courses.service.js";
import auth from "../middlewares/auth.mdw.js";

const router = express.Router();

router.get('/courses',auth.withLoginPermission(), auth.withLecturePermission(), async function(req, res) {
    const topics = await topicService.findAll();

    res.render('vwInstructor/courses', {
        layout: 'main-instructor',
        topics
    })
})

router.post('/courses/add/',auth.withLoginPermission(), auth.withLecturePermission(), async function(req, res) {
    const user = res.locals.authUser;
    const courses = await coursesService.findAll();

    const count = courses.length + 1;

    let type = "";

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const path = `./public/imgs/sp/`;
            fs.mkdirSync(path, { recursive: true });
            cb(null, path);
        },
        filename: async function (req, file, cb) {
            const typeOfFile = file.originalname.substring(
                file.originalname.indexOf("."),
                file.originalname.length
            );
            type = typeOfFile;
            cb(null, count + typeOfFile);
        },
    });
    const upload = multer({ storage });
    upload.array("image", 1)(req, res, async function (err) {
        let course = req.body;
        course.lecture_id = user.id;
        course.status = 0;

        for (let item in course) {
            if (course[item] === '') {
                course[item] = undefined;
            }
        }

        await coursesService.add(course);

        const url = '/';
        res.redirect(url);
    });
})

export default router;