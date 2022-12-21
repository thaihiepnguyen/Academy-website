import categoryService from '../services/category.service.js';
export default function (app) {
  app.use(async function (req, res, next) {
    const categories = await categoryService.findAll();
    res.locals.categories = categories;
    // res.locals.user = req.session.authUser;
    next();
  });
  app.use(async function (req, res, next) {
    if (typeof (req.session.auth) === 'undefined') {
      req.session.auth = false;
    }

    if (typeof (req.session.authUser) === 'undefined') {
      req.session.authUser = null;
    }

    if (req.session.auth) {
      res.locals.auth = req.session.auth;
      res.locals.user = req.session.authUser;
    } else {
      res.locals.auth = false;
      res.locals.user = null;
    }
    next();
  });
}