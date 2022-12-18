import categoryService from '../services/category.service.js';
export default function (app) {
  app.use(async function (req, res, next) {
    if (req.session.auth) {
      res.locals.auth = req.session.auth;
      res.locals.authUser = req.session.authUser;
    }
    next();
  });

  app.use(async function (req, res, next) {
    res.locals.lcCategories = await categoryService.findAll();
    next();
  });
}