import userService from "../services/user.service.js";
import bcrypt from "bcrypt";

export default {
    getLoginPage: (req, res) => {
        res.render('vwlogin/login.hbs', {
            isLoginPage: true,
        });
    },

    handleSignup: async (req, res) => {
        const user = {
            ...req.body,
            image: null,
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
            res.render('home', {
                user: user
            });
        } else {
            res.render('vwSignup/signup', {
                message: "Email is existed",
                isLoginPage: true,
            });
        }
    },

    getSignupPage: (req, res) => {
        res.render('vwSignup/signup.hbs', {
            isLoginPage: true,
        });
    },

    handleLogin: async (req, res) => {
        const user = await userService.findByUsername((req.body.username))
        if(user == null) {
            return res.render("vwlogin/login.hbs", {
                isLoginPage: true,
                err_message: "Invalid email or password."
            });
        }

        if(req.body.password != user.password) {
            return res.render("vwlogin/login.hbs", {
                isLoginPage: true,
                err_message: "Invalid email or password."
            });
        }

        //const ret = bcrypt.compare(req.body.password, user.password);

        // if(ret == false) {
        //     return res.render("vwlogin/login.hbs", {
        //         layout: false,
        //         err_message: "Invalid email or password."
        //     });
        // }

        req.session.auth = true;
        req.session.authUser = user;

        res.render('home', {
            user: req.session.authUser,
            isLogin: req.session.auth,
        });
    },

    getHomeProfilePage: (req, res) => {
        res.render('vwProfile/home_profile.hbs', {
            //isLoginPage: true,
        });
    },

    handleLogout: (req, res) => {
        req.session.auth = false;
        req.session.authUser = null;

        const url = '/';
        res.redirect(url);
    }
}