import express from 'express';
import userService from "../services/user.service.js";

const router = express.Router();

router.get('/login', function (req, res) {
    res.render('vwlogin/login.hbs');
})

router.post('/signup',async function (req, res) {
    const user = {
        ...req.body,
        image: 'ignore',
        role_id: 1,
    };

    await userService.add(user);

    res.render('../views/home', {
        user: user
    });
})


router.get('/signup', function (req, res) {
    res.render('vwSignup/signup.hbs');
})

export default router;