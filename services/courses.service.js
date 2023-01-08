import db from "../utils/db.js";
import categoryModel from "./category.service.js";
import userService from "./user.service.js";

export default {
	findCoursesById: async (id) => {
		const courses = await db("courses").where("id", id);

		console.log(courses[0]);
		return courses[0];
	},
	findCoursesByCatName: async (catName) => {
		const catID = await categoryModel.findByName(catName);
		const courses = await db("courses").where("category_id", catID);
		return courses;
	},
	findCoursesByLecturerName: async (firstname, lastname) => {
		const lecturerID = await userService.findByName(firstname, lastname);
		const courses = await db("courses").where("lecture_id", lecturerID);
		return courses;
	},
	findClipByCoursesId: async (id) => {
		const clips = await db("video").join("courses", "courses.id", "video.course_id").select("video.id", "video.source", "video.name").where("courses.id", id);

		console.log(clips);
		return clips;
	},
	findAll() {
		return db("courses");
	},
	del(id) {
		return db("courses").where("id", id).del();
	},
	findByCatId: async (CatId) => {
		const list = await db("courses").join("users", "users.id", "courses.lecture_id").select("courses.id", "users.firstname", "users.lastname", "courses.tiny_des", "courses.name", "courses.rating", "courses.price").where({ "courses.category_id": CatId });

		if (list.length === 0) {
			return null;
		}

		return list;
	},
	findDetails: async (idCourse) => {
		const averageStar = await db("review").avg("rating").where({ course_id: idCourse });
		//console.log(averageStar[0]["avg(`rating`)"]);
		const updateStar = await db("courses")
			.where({ id: idCourse })
			.update({ rating: Math.round(averageStar[0]["avg(`rating`)"]) });
		const list = await db("courses").select("courses.thumbnail", "courses.name", "courses.levelCourse", "courses.rating", "courses.durationCourse", "courses.weeklyHours", "courses.enrolled", "courses.price", "courses.discount", "courses.tiny_des", "courses.requirements", "courses.overview", "courses.includedItem", "courses.lecture_id").where({ "courses.id": idCourse });
		if (list[0]["lecture_id"] != null) {
			const lecturerName = await db("users").select("firstname", "lastname").where({ id: list[0]["lecture_id"] });
			//console.log(lecturerName);
			list[0].firstname = lecturerName[0]["firstname"];
			list[0].lastname = lecturerName[0]["lastname"];
		}
		if (list.length === 0) {
			return null;
		}
		return list;
	},
	findVideoForCourse: async (courseID, videoID) => {
		const thisVideo = await db("video").select("source", "name").where({ course_id: courseID, id: videoID });
		//console.log(videoLink[0]["source"]);
		return thisVideo;
	},
	unrollInCourse: async (userID, idCourse) => {
		const deleteRecord = await db("registered_courses")
			.where({
				"registered_courses.user_id": userID,
				"registered_courses.course_id": idCourse,
			})
			.del();
		const numberEnrolled = await db("registered_courses").count(`user_id`).where({ course_id: idCourse });
		const updateEnrolled = await db("courses").where({ id: idCourse }).update({ enrolled: numberEnrolled[0]["count(`user_id`)"] });
	},
	rollInCourse: async (userID, idCourse) => {
		const list = await db("registered_courses").insert({
			user_id: userID,
			course_id: idCourse,
		});
		const numberEnrolled = await db("registered_courses").count(`user_id`).where({ course_id: idCourse });
		const updateEnrolled = await db("courses").where({ id: idCourse }).update({ enrolled: numberEnrolled[0]["count(`user_id`)"] });
		return null;
	},
	rollInThis: async (userID, idCourse) => {
		const list = await db("registered_courses").select("registered_courses.user_id", "registered_courses.course_id").where({
			"registered_courses.user_id": userID,
			"registered_courses.course_id": idCourse,
		});
		if (list.length === 0) {
			return null;
		}

		return list;
	},
	sendReviews: async (userID, idCourse, reviewContent, ratingStar) => {
		const list = await db("review").insert({
			user_id: userID,
			course_id: idCourse,
			comment: reviewContent,
			rating: ratingStar,
		});

		return null;
	},
	getReviews: async (idCourse) => {
		const list1 = await db("review").join("users", "users.id", "review.user_id").select("users.lastname", "users.image", "review.comment").where({ "review.course_id": idCourse });
		if (list1.length === 0) {
			return null;
		}

		return list1;
	},
	getClips: async (idCourse) => {
		const list2 = await db("video").select("video.thumbnail", "video.source", "video.name", "video.type", "video.time", "video.id", "video.free").where({ "video.course_id": idCourse });
		console.log(list2);
		if (list2.length === 0) {
			return null;
		}
		return list2;
	},
	findGeneralData() {
		return [
			{
				urlImage: "https://media.sketchfab.com/models/3f49271eb0dc404e87333baebca59886/thumbnails/914bdb37755946e8813325f9592bb0da/c09eace2ef6942268f325c369b1043e3.jpeg",
				nameCourse: "Unity 3D for dummies",
				level: "Beginner",
				stars: [true, true, true, true, false],
				numberOfStars: 4,
				reviews: 2,
				duration: 2,
				weekly: 3,
				enrolled: 4033,
				price: 20,
				discountTo: 5,
				timeLeft: "1 day 04:09:07",
				shortInfo: "You want to create your own game but dont know where to begin your journey?\nThis is the course for you!",
				requirements: "_Basic knowledge about computer \n_Have good internet connection",
				overview: "_In this course you will learn: \n+Basic programming using C#, +Popular tools in Unity 3D \n+Making 3 simple games with concept: 3d racing game, 2d action game and a top down rpg",
				includedItem: "_20 hours on-demand video \n_2 articles \n_10 quizzes \n_Full lifetime access all resources in this course",
			},
		];
	},
	findClip() {
		return [
			{
				urlImage: "https://media.sketchfab.com/models/3f49271eb0dc404e87333baebca59886/thumbnails/914bdb37755946e8813325f9592bb0da/c09eace2ef6942268f325c369b1043e3.jpeg",
				nameVid: "Introduction",
				videoLength: "10:30",
				free: true,
			},
			{
				urlImage: "https://media.sketchfab.com/models/3f49271eb0dc404e87333baebca59886/thumbnails/914bdb37755946e8813325f9592bb0da/c09eace2ef6942268f325c369b1043e3.jpeg",
				nameVid: "Setup environments",
				videoLength: "4:08",
				free: false,
			},
			{
				urlImage: "https://media.sketchfab.com/models/3f49271eb0dc404e87333baebca59886/thumbnails/914bdb37755946e8813325f9592bb0da/c09eace2ef6942268f325c369b1043e3.jpeg",
				nameVid: "Basic tools",
				videoLength: "8:12",
				free: false,
			},
		];
	},

	async findTop5Courses() {
		const list = await db("courses").join("users", "users.id", "courses.lecture_id").select("courses.id", "users.firstname", "users.lastname", "courses.tiny_des", "courses.name", "courses.rating", "courses.price", "courses.category_id").orderBy("rating", "desc").limit(5).offset(0);

		if (list.length === 0) {
			return null;
		}

		// add categoryName object into list

		for (let item of list) {
			const categoryName = await db("courses").join("categories", "categories.id", "courses.category_id").select("categories.name").where({
				"categories.id": item.category_id,
			});

			item.catName = categoryName[0].name;
		}
		return list;
	},

	findComments() {
		return [
			{
				urlImage: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp",
				username: "Rasputin",
				contentReview: "Roses are red \nViolets are blue \nThis is good ",
			},
			{
				urlImage: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp",
				username: "Pewdipie",
				contentReview: "Good for beginner, worth the money!",
			},
		];
	},

	async countByFullTextSearch(key) {
		const list = await db("courses").join("categories", "category_id", "categories.id").join("users", "lecture_id", "users.id").whereRaw("MATCH(courses.name) AGAINST(?)", key).orWhereRaw("MATCH(courses.tiny_des) AGAINST(?)", key).orWhereRaw("MATCH(categories.name) AGAINST(?)", key).orWhereRaw("MATCH(users.firstname) AGAINST(?)", key).orWhereRaw("MATCH(users.lastname) AGAINST(?)", key).count({ amount: "courses.id" });

		return list[0].amount;
	},

	async findByFullTextSearch(key, limit, offset) {
		const list = await db("courses").select("courses.id", "courses.name", "courses.thumbnail", "courses.tiny_des", "courses.full_des", "courses.price", "courses.last_modify", "courses.price", "courses.status", "courses.category_id", "courses.lecture_id", "courses.promotion_id", "courses.rating").join("categories", "category_id", "categories.id").join("users", "lecture_id", "users.id").whereRaw("MATCH(courses.name) AGAINST(?)", key).orWhereRaw("MATCH(courses.tiny_des) AGAINST(?)", key).orWhereRaw("MATCH(categories.name) AGAINST(?)", key).orWhereRaw("MATCH(users.firstname) AGAINST(?)", key).orWhereRaw("MATCH(users.lastname) AGAINST(?)", key).limit(limit).offset(offset);

		if (list.length === 0) {
			return null;
		}

		return list;
	},
};
