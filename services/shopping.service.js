import db from "../utils/db.js";

export default {
    async findAll() {
        return await db('shopping_cart');
    },
    async findByUserID(id) {
        const list = db('shopping_cart').where('user_id', id);
        if (list.length === 0) return null;

        return list;
    },
    async isExist(userID, courseID) {
        const list = await db('shopping_cart')
            .where('user_id', userID)
            .where('course_id',courseID);

        if (list.length === 0) return false;
        return true;
    },
    async delete(userID, courseID) {
        return db('shopping_cart')
            .where('user_id', userID)
            .where('course_id', courseID).del();
    },
    add(entity) {
        return db('shopping_cart').insert(entity);
    },
}
