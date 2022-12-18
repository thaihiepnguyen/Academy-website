import express from 'express';
import accountController from "../controllers/account.controller.js";

const router = express.Router();

router.get('/login', accountController.getLoginPage);

router.get('/signup', accountController.getSignupPage);

router.post('/signup', accountController.handleSignup);

router.post('/login', accountController.handleLogin);

router.get('/home_profile', accountController.getHomeProfilePage);

router.post('/logout', accountController.handleLogout);

export default router;