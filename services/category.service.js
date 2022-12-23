import db from '../utils/db.js';

export default {
    findAll: async () => {
        const list = await db('categories');
            // .join('topics', 'topics.field_id', 'categories.id')
            // .select('topics.id', 'topics.name as t_name', 'categories.name as c_name');
        if (list.length === 0) {
            return null;
        }


        console.log(list)

        return list;
    },
}