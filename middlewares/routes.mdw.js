import accountRoute from '../routes/account.route.js';
import categoryRoute from "../routes/category.route.js";
import coursesRoute from "../routes/courses.route.js";
import coursesService from "../services/courses.service.js";
import topicService from "../services/topic.service.js";
import categoryService from "../services/category.service.js";
import accountService from "../services/account.service.js";
import watchListService from "../services/watch-list.service.js";
import adminRoute from "../routes/admin.route.js";
import shoppingService from "../services/shopping.service.js";
import instructorRoute from "../routes/instructor.route.js";
import videoService from '../services/video.service.js';

export default function(app) {	
	app.get('/', async (req, res) => {
		const user = res.locals.authUser;

		const courses = [];

		const titleOfTop3 = "Top 3 The Most Rating Courses"
		const coursesTop3 = await coursesService.findTop3Most();
		courses.push({
			title: titleOfTop3,
			entity: coursesTop3
		});

		const titleOfTop10 = "Top 10 The Most Viewed Courses"
		const coursesTop10 = await coursesService.findAll();

		courses.push({
			title: titleOfTop10,
			entity: coursesTop10
		});
		//  course = {
		// 	...,
		// 	topic_id: 1,
		// 	category_id: 2,
		//  ratings: ["rating-color", "rating-color", "", "", ""]
		// 	...,
		// 	}
		const isExistCourses = courses.length !== 0;

		let watchList = null;
		if (typeof user !== 'undefined')
			watchList = await watchListService.findByUserID(user.id);

		let enrollList = null;
		if (typeof user !== 'undefined')
			enrollList = await shoppingService.findByUserID(user.id);
		// add topic and category id
		for (let item of courses) {
			for (let course of item.entity) {
				course.isWatchList = false;
				course.isEnrolled = false;
				let topic = await topicService.findById(course.topic_id);
				let category = await categoryService.findById(topic.category_id);
				let lecture = await accountService.findById(course.lecture_id);
				let videos = await videoService.findByCourseId(course.id);
				course.category_id = topic.category_id;
				course.category_name = category.name;
				course.lecture_name = lecture.firstname + lecture.lastname;
				if (videos !== null)
					course.video = videos[0].source;

				if (watchList !== null)
					for (let item of watchList) {
						if (item.course_id === course.id) {
							course.isWatchList = true;
						}
					}
				if (enrollList !== null)
					for (let item of enrollList) {
						if (item.course_id === course.id) {
							course.isEnrolled = true;
						}
					}
			}
		}


		// add ratings
		for (let item of courses) {
			for (let i = 0 ; i < item.entity.length; i++) {
				let ratings = ["", "", "", "", ""];
				for (let j = 0; j < item.entity[i].rating; j++) {
					ratings[j] = "rating-color"; // rating-color is a css class.
				}
				item.entity[i].ratings = ratings;
			}
		}

		// add video

		res.render('home', {
			courses,
			isExistCourses
		});
	})

	app.use('/account', accountRoute);
	app.use('/categories', categoryRoute);
	app.use('/courses', coursesRoute);
	app.use('/admin', adminRoute);
	app.use('/instructor', instructorRoute);
}
