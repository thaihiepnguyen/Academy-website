import db from "../utils/db.js";

export default {
	findAll: async () => {
		const list = await db("topics");
		if (list.length === 0) {
			return null;
		}
		// console.log(list)

		return list;
	},
	async findById(id) {
		const list = await db("topics").where("id", id);
		if (list.length === 0) {
			return null;
		}
		return list[0];
	},
	async del(id) {
		return await db("topics").where("id", id).del();
	},
	add(entity) {
		return db("topics").insert(entity);
	},
	patch(entity) {
		const id = entity.id;
		delete entity.id;
		return db("topics").where("id", id).update(entity);
	},
};
