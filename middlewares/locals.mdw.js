import categoryService from '../services/category.service.js';
import topicService from "../services/topic.service.js";
export default function(app) {
    app.use(async function (req, res, next) {
        req.session.url = null;
        if (req.session.auth) {
            res.locals.auth = req.session.auth;
            res.locals.authUser = req.session.authUser;
        }
        next();
    });
    app.use(async function (req, res, next) {
        let categories = await categoryService.findAll();
        const topics = await topicService.findAll();

        // add topic into categories
        for (let category of categories) {
            let topicsOfCategory = [];
            for (let topic of topics) {
                if (topic.category_id === category.id) {
                    topicsOfCategory.push(topic);
                }
            }
            category.lcTopics = topicsOfCategory
        }

        res.locals.lcCategories = categories;
        req.session.seCategories = res.locals.lcCategories;
        next();
    });
}