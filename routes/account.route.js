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

    const entity = await userService.findAll();
    let isEmailExists = false;

    for (let item of entity) {
        if (item.email === user.email) {
            isEmailExists = true;
        }
    }

    if (!isEmailExists) {
        await userService.add(user);
        console.log(`Tài khoản ${user.firstname} ${user.lastname} đã được đăng ký!`);
        res.render('home', {
            user: user
        });
    } else {
        console.log("Tài khoản email này đã được sử dụng!");
        res.render('vwSignup/signup', {
            message: "Tài khoản email này đã được sử dụng!",
        });
    }
})


router.get('/signup', function (req, res) {
    res.render('vwSignup/signup.hbs');
})

export default router;