import db from "../utils/db.js";

export default {
	findAll: async () => {
		const list = await db("role");
		if (list.length === 0) {
			return null;
		}
		return list;
	},
};
