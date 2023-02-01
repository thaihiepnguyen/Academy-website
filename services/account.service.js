import db from "../utils/db.js";

export default {
    async findAll() {
        return await db('users');
    },

    async findById(id) {
        const users = await db('users').where('id', id);
        if (users.length === 0) {
            return null
        }
        return users[0];
    },

	add(user) {
		return db('users').insert(user);
	},

    async findByEmail(email) {
        const users = await db('users').where('email', email);
        if (users.length === 0) {
            return null;
        }
        return users[0];
    },
    patch: (user) => {
        const id = user.id;
        delete user.id;
        return db("users").where("id", id).update(user);
    },
}
