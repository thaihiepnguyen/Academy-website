import express from "express";

import lectureService from "../services/lecture.service.js";
import userService from "../services/user.service.js";
const router = express.Router();

router.get('/', async (req, res) => {
    const user = res.locals.user;

    // hiển thị tất cả thông tin khóa học của giảng viên này

    const courses = await lectureService.findCoursesByLectureId(user.id);


    res.render('vwLecture/vwCourses/courses', {
        courses,
        activeTagbarLayout: true,
    });
});

router.get('/users', async (req, res) => {
    // hiển thị tất cả thông tin của học viên đăng ký của giảng viên

    res.render("vwLecture/vwUsers/users", {
		activeTagbarLayout: true,
	});
});

router.get('/courses',async(req, res)=> {
    // hiển thị tất cả thông tin khóa học của giảng viên này

    const user = res.locals.user;
    const courses = await lectureService.findCoursesByLectureId(user.id);


    res.render('vwLecture/vwCourses/courses', {
        courses,
        activeTagbarLayout: true,
    })

})
router.get('/courses/add',async(req, res)=> {
    // hiển thị ddang ky khoa hocj moi

    const user = res.locals.user;
    const courses = await lectureService.findCoursesByLectureId(user.id);


    res.render('vwLecture/vwCreateCourses/createCourse', {
        courses,
        activeTagbarLayout: true,
    })

})

// edit courses

router.get("/courses/edit", async function (req, res) {
	const id = req.query.id || 0;

	const course = await lectureService.findCourseEdit(id);
    const video = await lectureService.findVideoOfCourses(id,course.id);
    console.log("vif");
    console.log(video.id);

	res.render("vwLecture/vwCreateCourses/editCourse", {
		activeTagbarLayout: true,
		course,
        video,
	});
});

export default router;
