import db from '../utils/db.js';

export default {
    findAll: async () => {
        const list = await db('categories');
        if (list.length === 0) {
            return null;
        }

        return list;
    },
}