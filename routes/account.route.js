import express from 'express';
import accountController from "../controllers/account.controller.js";
import authWithRequiredPermission from '../middlewares/auth.mdw.js';
import passportGoogle from "../utils/passport-google-setup.js";
import passportFacebook from "../utils/passport-facebook-setup.js";

const router = express.Router();

router.use(passportGoogle.initialize());

router.use(passportGoogle.session());

router.use(passportFacebook.initialize());

router.use(passportFacebook.session());

router.get('/login/', accountController.getLoginPage);

router.get('/signup/', accountController.getSignupPage);

router.post('/signup/', accountController.sendVerifyMail);

router.post('/signup/otp/', accountController.handleSignup);

router.post('/login/', accountController.handleLogin);

router.post('/logout', accountController.handleLogout);

router.get('/home_profile', authWithRequiredPermission(0), accountController.getHomeProfilePage);

router.post('/home_profile', authWithRequiredPermission(0), accountController.editUserProfile);

router.get('/account_security', authWithRequiredPermission(0), accountController.getAccountSecurityPage);

router.post('/account_security', authWithRequiredPermission(0), accountController.editUserPassword);

router.get('/photo', authWithRequiredPermission(0), accountController.getPhotoPage);

router.post('/photo', authWithRequiredPermission(0), accountController.uploadPhoto);

router.get('/watch_list', authWithRequiredPermission(0), accountController.getWatchListPage);

router.post('/watch_list/delete/:id', authWithRequiredPermission(0), accountController.deleteWatchListPage);

router.post('/watch_list/add/:id', authWithRequiredPermission(0), accountController.addWatchListPage);

router.get('/registered_courses', authWithRequiredPermission(0), accountController.getRegisteredCoursesPage);

router.get('/logout', authWithRequiredPermission(0), accountController.getLogOutPage);

router.get('/google', passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passportGoogle.authenticate('google', { failureRedirect: '/login' }), accountController.callbackGoogle);

router.get('/facebook', passportFacebook.authenticate('facebook',{scope:'email'}));

router.get('/facebook/callback', passportFacebook.authenticate('facebook', { failureRedirect: '/login' }), accountController.callbackFacebook);



export default router;