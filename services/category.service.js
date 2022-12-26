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
	add(entity) {
		return db("categories").insert(entity);
	},
	del(id) {
		return db("categories").where("id", id).del();
	},
	patch(entity) {
		const id = entity.id;
		delete entity.id;
		return db("categories").where("id", id).update(entity);
	},
};
