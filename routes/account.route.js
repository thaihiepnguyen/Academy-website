import express from 'express';
import accountController from "../controllers/account.controller.js";
import authWithRequiredPermission from '../middlewares/auth.mdw.js';
import passport from "../utils/passport-setup.js";

const router = express.Router();

router.use(passport.initialize());

router.use(passport.session());

router.get('/login', accountController.getLoginPage);

router.get('/signup', accountController.getSignupPage);

router.post('/signup', accountController.handleSignup);

router.post('/login', accountController.handleLogin);

router.post('/logout', accountController.handleLogout);

router.get('/home_profile', authWithRequiredPermission(0), accountController.getHomeProfilePage);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), accountController.callback);

export default router;