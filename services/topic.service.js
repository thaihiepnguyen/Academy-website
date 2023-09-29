import db from "../utils/db.js";

export default {
	async findAll() {
		return await db("topics");
	},

	async findById(id) {
		const topics = await db("topics").where("topicId", id);
		if (topics.length === 0) {
			return null;
		}

		return topics[0];
	},
	del(id) {
		return db("topics").where("topicId", id).del();
	},
	add(entity) {
		return db("topics").insert(entity);
	},
	patch(entity) {
		const id = entity.topicId;
		delete entity.topicId;
		return db("topics").where("topicId", id).update(entity);
	},
};
