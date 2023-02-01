export default {
    withLoginPermission() {
        return function (req, res, next) {
            if (!req.session.auth) {
                req.session.retUrl = req.originalUrl;
                return res.redirect('/account/login');
            }
            next();
        }
    },
    withStudentPermission() {

    },
    withAdminPermission() {

    },
    withLecturePermission() {
        return function (req, res, next) {
            const user = req.session.authUser;

            if (user.role_id !== 2) {
                req.session.retUrl = req.originalUrl;
                return res.redirect('/');
            }
            next();
        }
    },
}