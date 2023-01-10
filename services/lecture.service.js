import db from "../utils/db.js";

export default {
	async findById(id) {
		const list = await db("user").where("id", id).where('role', 2);
		if (list.length === 0) {
                return null;
            }
            return list[0];
    },
    findCoursesByLectureId: async (id) => {
        const list = await db("courses").where("lecture_id", id);
        if (list.length === 0) {
            return null;
        }
        return list;
    },
    findCourseEdit: async (id) => {
        const list = await db("courses").where("id",id);

        if(list.length == 0) return null;
        return list[0];
    },
    findVideoOfCourses: async (id_lecture, id_course) =>{
        const list = await db("video").where("lecture_id",id_lecture).where("course_id" , id_course);
        if(list.length == 0) return null;
        return list[0];
        
    }

};
