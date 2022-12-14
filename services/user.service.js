import db from '../utils/db.js';

export default {
    async findById(id) {
        const list = await db('users').where('id', id);
        if (list.length === 0) {
            return null;
        }

        return list[0];
    },

    async findByUsername(username) {
        const list = await db('users').where('username', username);
        if (list.length === 0) {
            return null;
        }

        return list[0];
    },

    add(entity) {
        return db('users').insert(entity);
    },

    del(id) {
        return db('users').where('id', id).del();
    },

    patch(entity) {
        const id = entity.id;
        delete entity.id;
        return db('users').where('id', id).update(entity);
    }
}