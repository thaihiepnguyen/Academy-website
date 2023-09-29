import db from "../utils/db.js";
import watchListService from "./watch-list.service.js";
import shoppingService from "./shopping.service.js";

export default {
	add(course) {
		return db("courses").insert(course);
	},

	async findAll() {
		return await db("courses");
	},
	lockCourse: (id) => {
		return db("courses").where("id", id).update({ enable: 0 });
	},
	unlockCourse: (id) => {
		return db("courses").where("id", id).update({ enable: 1 });
	},
	async findById(id) {
		const courses = await db("courses").join("topics", "topics.topicId", "courses.topic_id").where("id", id);
		if (courses.length === 0) {
			return null;
		}

		return courses[0];
	},
	async findByCatId(id) {
		const courses = await db("courses").join("topics", "topics.topicId", "courses.topic_id").where("category_id", id);

		if (courses.length === 0) return null;

		return courses;
	},
	async findPageByCat(id, offset, limit) {
		const courses = await db("courses").join("topics", "topics.topicId", "courses.topic_id").where("category_id", id).offset(offset).limit(limit);

		if (courses.length === 0) return null;

		return courses;
	},
	async findPageByTopic(id, offset, limit) {
		const courses = await db("courses").join("topics", "topics.topicId", "courses.topic_id").where("topic_id", id).offset(offset).limit(limit);

		if (courses.length === 0) return null;

		return courses;
	},
	async findPageByCatByRating(id, offset, limit, ratings) {
		const courses = await db("courses").where("courses.rating", ">=", ratings).join("topics", "topics.topicId", "courses.topic_id").where("category_id", id).offset(offset).limit(limit);

		if (courses.length === 0) return null;

		return courses;
	},
	async countByCatId(id) {
		const list = await db("courses").join("topics", "topics.topicId", "courses.topic_id").where("category_id", id).count({ amount: "id" });

		return list[0].amount;
	},
	async countByTopicId(id) {
		const list = await db("courses").join("topics", "topics.topicId", "courses.topic_id").where("topic_id", id).count({ amount: "id" });

		return list[0].amount;
	},

	async countByCatIdByRating(id, ratings) {
		const list = await db("courses").where("courses.rating", ">=", ratings).join("topics", "topics.topicId", "courses.topic_id").where("category_id", id).count({ amount: "id" });

		return list[0].amount;
	},
	async findPageBySearch(key, offset, limit) {
		const courses = await db("courses").join("topics", "topics.topicId", "courses.topic_id").whereRaw("MATCH(courses.name) AGAINST(?)", key).orWhereRaw("MATCH(courses.tiny_des) AGAINST(?)", key).orWhereRaw("MATCH(courses.full_des) AGAINST(?)", key).offset(offset).limit(limit);

		if (courses.length === 0) return null;

		return courses;
	},
	async findPageBySearchByRatings(key, offset, limit, ratings) {
		const courses = await db("courses").where("courses.rating", ">=", ratings).join("topics", "topics.topicId", "courses.topic_id").whereRaw("MATCH(courses.name) AGAINST(?)", key).orWhereRaw("MATCH(courses.tiny_des) AGAINST(?)", key).orWhereRaw("MATCH(courses.full_des) AGAINST(?)", key).offset(offset).limit(limit);

		if (courses.length === 0) return null;

		return courses;
	},
	async countBySearch(key) {
		const list = await db("courses").join("topics", "topics.topicId", "courses.topic_id").whereRaw("MATCH(courses.name) AGAINST(?)", key).orWhereRaw("MATCH(courses.tiny_des) AGAINST(?)", key).orWhereRaw("MATCH(courses.full_des) AGAINST(?)", key).count({ amount: "id" });

		return list[0].amount;
	},
	async countBySearchByRating(key, ratings) {
		const list = await db("courses").where("courses.rating", ">=", ratings).join("topics", "topics.topicId", "courses.topic_id").whereRaw("MATCH(courses.name) AGAINST(?)", key).orWhereRaw("MATCH(courses.tiny_des) AGAINST(?)", key).orWhereRaw("MATCH(courses.full_des) AGAINST(?)", key).count({ amount: "id" });

		return list[0].amount;
	},

	findTop3Most() {
		return db("courses").orderBy("rating", "desc").limit(3).offset(0);
	},

	async count() {
		const list = await db("courses").count({ amount: "id" });

		return list[0].amount;
	},
};
