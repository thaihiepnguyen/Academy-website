import express from 'express';
import userService from "../services/user.service.js";
import accountController from "../controllers/account.controller.js";

const router = express.Router();

router.get('/login', accountController.getLoginPage);

router.get('/signup', accountController.getSignupPage);

router.post('/signup', accountController.handleSignup);

export default router;