import coursesService from "../services/courses.service.js";


export default {
    findByCatId: async (req, res) => {
        const CatId = req.params.id;

        const courses = await coursesService.findByCatId(CatId);

        const categories = res.locals.categories;


        for (let i = 0; i < courses.length; i++) {
            let ratings = ["", "", "", "", ""];
            for (let j = 0; j < courses[i].rating; j++) {
                ratings[j] = "rating-color";
            }
            courses[i].ratings = ratings;
        }

        let catName = "";
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id === 1) {
                catName = categories[i].name;
            }
        }

        res.render('vwProduct/courses', {
            courses,
            catName,
        });
    }
}