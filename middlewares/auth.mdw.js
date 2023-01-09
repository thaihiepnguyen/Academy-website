export default function authWithRequiredPermission(requiredPermission) {
  return function (req, res, next) {
    if (!req.session.auth) {
      req.session.retUrl = req.originalUrl;
      return res.redirect('/account/login/1');
    }

    if (req.session.authUser && req.session.authUser.permission < requiredPermission) {
      return res.render('403', { layout: false });
    }

    next();
  }
}