import db from "../utils/db.js";

export default {
	findAll: async () => {
		const list = await db("categories");
		// .join('topics', 'topics.field_id', 'categories.id')
		// .select('topics.id', 'topics.name as t_name', 'categories.name as c_name');
		if (list.length === 0) {
			return null;
		}

		return list;
	},
	async findById(id) {
		const list = await db("categories").where("id", id);
		if (list.length === 0) {
			return null;
		}
		return list[0];
	},
	async findByName(name) {
		const list = await db("categories").where("name", name);
		if (list.length === 0) {
			return null;
		}
		return list[0].id;
	},
	add(entity) {
		return db("categories").insert(entity);
	},
	async del(id) {
		await db("topics").where("field_id", id).del();

		return await db("categories").where("id", id).del();
	},
	patch(entity) {
		const id = entity.id;
		delete entity.id;
		return db("categories").where("id", id).update(entity);
	},
};
