import db from "../utils/db.js";

export default {
    findCoursesByInsId(id) {
        return db('courses').where('lecture_id', id);
    },

    add(course) {
        return db('courses').insert(course);
    }
}
