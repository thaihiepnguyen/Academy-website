import categoryService from '../services/category.service.js';
export default function (app) {
  app.use(async function (req, res, next) {
    const categories = await categoryService.findAll();
    res.locals.categories = categories;
    next();
  });
}