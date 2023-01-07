import db from "../utils/db.js";

export default {
	async findAllWithRole() {
		const sql = `select u.*, (r.name) as role
                    from users u left join role r on u.role_id = r.id
                     group by u.id, u.email`;
		const raw = await db.raw(sql);
		return raw[0];
	},
	findAll: async () => {
		const list = await db("users");
		if (list.length === 0) {
			return null;
		}

		return list;
	},

	findById: async (id) => {
		const list = await db("users").where("id", id);
		if (list.length === 0) {
			return null;
		}
		return list[0];
	},

	findByEmail: async (email) => {
		const list = await db("users").where("email", email);
		if (list.length === 0) {
			return null;
		}
		return list[0];
	},

	add: (entity) => {
		return db("users").insert(entity);
	},

	del: (id) => {
		return db("users").where("id", id).del();
	},

	patch: (entity) => {
		const id = entity.id;
		delete entity.id;
		return db("users").where("id", id).update(entity);
	},
	lockUser: (id) => {
		return db("users").where("id", id).update({ enable: 0 });
	},
	unlockUser: (id) => {
		return db("users").where("id", id).update({ enable: 1 });
	},

	findWatchList: async (id) => {
		const list = await db("watch_list").join("courses", "course_id", "id").where("user_id", id);

		if (list.length === 0) {
			return null;
		}

		return list;
	},

	checkCourseInWatchList: async (user_id, course_id) => {
		const check = await db("watch_list").where({"user_id": user_id,
			"course_id": course_id
		});

		return check;
	},

	deleteCourseInWatchList: async (user_id, course_id) => {
		const check = await db("watch_list").where({"user_id": user_id,
			"course_id": course_id
		}).delete();

		return check;
	},

	addCourseInWatchList: async (user_id, course_id) => {
		const check = await db("watch_list").insert({"user_id": user_id, "course_id": course_id});
		return check;
	},


	findRegisteredCourses: async (id) => {
		const list = await db("registered_courses").join("courses", "course_id", "id").where("user_id", id);

		if (list.length === 0) {
			return null;
		}

		return list;
	},
};
