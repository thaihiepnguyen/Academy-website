import db from "../utils/db.js";

export default {
    async findAll() {
        return await db('categories');
    },

    async findById(id) {
        const categories = await db('categories').where('id', id);
        if (categories.length === 0) {
            return null
        }
        return categories[0];
    },
    async findByName(name) {
        const list = await db("categories").where("name", name);
        if (list.length === 0) {
            return null;
        }
        return list[0].id;
    },
    add(category) {
        return db("categories").insert(category);
    },
    async del(id) {
        await db("topics").where("category_id", id).del();

        return db("categories").where("id", id).del();
    },
    patch(entity) {
        const id = entity.id;
        delete entity.id;
        return db("categories").where("id", id).update(entity);
    },
}
