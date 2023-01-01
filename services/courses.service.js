import db from "../utils/db.js";

export default {
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
		const list = await db("courses").select("courses.thumbnail", "courses.name", "courses.levelCourse", "courses.rating", "courses.durationCourse", "courses.weeklyHours", "courses.enrolled", "courses.price", "courses.discount", "courses.tiny_des", "courses.requirements", "courses.overview", "courses.includedItem").where({ "courses.id": idCourse });
		if (list.length === 0) {
			return null;
		}

		return list;
	},
	sendReviews: async (userID, idCourse, reviewContent) => {
		const list = await db("review").insert({
			user_id: userID,
			course_id: idCourse,
			comment: reviewContent,
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
		const list = await db("courses").join("users", "users.id", "courses.lecture_id").select("courses.id", "users.firstname", "users.lastname", "courses.tiny_des", "courses.name", "courses.rating", "courses.price").orderBy("rating", "desc").limit(5).offset(0);

		if (list.length === 0) {
			return null;
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
