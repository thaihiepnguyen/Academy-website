import coursesService from "../services/courses.service.js";
import * as constants from "constants";


export default {
    findByCatId: async (req, res) => {
        req.session.retUrl = req.originalUrl;
        const CatId = req.params.id;

        const courses = await coursesService.findByCatId(CatId);

        const categories = res.locals.categories;
        let catName = "";
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id == CatId) {
                catName = categories[i].name;
            }
        }

        if (courses == null) {
            res.render('vwProduct/courses',{
                    catName,
                    activeTagbarLayout: true,
                    warning: `Can not find any courses of ${catName}`
                });
            return;
        }

        for (let i = 0; i < courses.length; i++) {
            let ratings = ["", "", "", "", ""];
            for (let j = 0; j < courses[i].rating; j++) {
                ratings[j] = "rating-color";
            }
            courses[i].ratings = ratings;
        }

        res.render('vwProduct/courses', {
            activeTagbarLayout: true,
            courses,
            catName,
        });
    },

    fullTextSearch: async (req, res) => {

        const key = req.body.key;

        const courses = await coursesService.findByFullTextSearch(key);
        let catName = "";

        if (courses == null) {
            return res.render('vwProduct/courses',{
                catName,
                activeTagbarLayout: true,
                warning: `Can not find any courses of ${key}`
            });
        }

        const length = courses.length;

        console.log(courses);

        res.render('vwProduct/courses', {
            activeTagbarLayout: true,
            courses,
            catName: `Find ${length} results`,
        });
    }
}
