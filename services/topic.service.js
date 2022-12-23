import db from '../utils/db.js';

export default {
    findAll: async () => {
        const list = await db('topics');
        if (list.length === 0) {
            return null;
        }
        console.log(list)

        return list;
    },
}