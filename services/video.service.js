import db from "../utils/db.js";

export default {
    async findAll() {
        return await db('video');
    },

    async findById(id) {
        const videos = await db('video').where('id', id);
        if (videos.length === 0) {
            return null;
        }
        return videos[0];
    },

    async findByCourseId(id) {
        const videos = await db('video').where('course_id', id);
        if (videos.length === 0) {
            return null;
        }
        return videos;
    }
}
