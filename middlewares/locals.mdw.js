import categoryService from '../services/category.service.js';
import topicService from '../services/topic.service.js';
export default function (app) {
  app.use(async function (req, res, next) {
    const categories = await categoryService.findAll();
    res.locals.categories = categories;
    // res.locals.user = req.session.authUser;
    next();
  });
   app.use(async function (req, res, next) {
     const topic = await topicService.findAll();
     res.locals.topic = topic;
     console.log(topic);
     // res.locals.user = req.session.authUser;
     next();
   });
  app.use(async function (req, res, next) {
    
    // req.session.retUrl = req.originalUrl;
    if (typeof (req.session.auth) === 'undefined') {
      req.session.auth = false;
    }

    if (typeof (req.session.authUser) === 'undefined') {
      req.session.authUser = null;
    }

    if (req.session.auth) {
      if (req.session.authUser.image === null) {
        req.session.authUser.image = '/imgs/avt/0.png';
      }
      res.locals.auth = req.session.auth;
      res.locals.user = req.session.authUser;

      // console.log(req.session.auth);
    } else {
      res.locals.auth = false;
      res.locals.user = null;
    }
    next();
  });
}