import userService from "../services/user.service.js";
import bcrypt from "bcryptjs";

export default {
    getLoginPage: (req, res) => {
        res.render('vwlogin/login.hbs', {
            isDefault: true,
        });
    },

    handleSignup: async (req, res) => {
        const rawPass = req.body.password;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(rawPass, salt);

        req.body.password = hash;


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
            res.render('vwLogin/login');
        } else {
            res.render('vwSignup/signup', {
                message: "Email is existed"
            });
        }
    },

    getSignupPage: (req, res) => {
        res.render('vwSignup/signup.hbs', {
            isDefault: true,
        });
    },

    handleLogin: async (req, res) => {
        const user = req.body;
        const rawUser = await userService.findByEmail(req.body.email);

        if(rawUser == null) {
            return res.render("vwlogin/login.hbs", {
                err_message: "Invalid email or password."
            });
        }
        else if(!bcrypt.compareSync(user.password, rawUser.password)) {
            return res.render("vwlogin/login.hbs", {
                err_message: "Invalid email or password."
            });
        }
        else{
            req.session.auth = true;
            req.session.authUser = rawUser;

            res.render('home', {
                activeTagbarLayout: true,
                user: req.session.authUser,
                isLogin: req.session.auth,
            });
        }
    },

    getHomeProfilePage: (req, res) => {
        console.log(req.session.authUser);
        res.render('vwProfile/public_profile.hbs', {
            activeProfileLayout: true,
            // isDefault: true,
            user: req.session.authUser,
        });
    },

    handleLogout: (req, res) => {

        req.session.auth = false;
        req.session.authUser = null;

        const url = req.headers.referer || '/';
        res.redirect(url);
    },

    callback: async (req, res) => {
        // Successful authentication, redirect home.

        const { user } = req;

        const userdb = {
            ...req.body,
            email: user.emails[0].value,
            firstname: user.name.givenName,
            lastname: user.name.familyName,
            image: user.photos[0].value,
            role_id: 1,
        };

        const isSignUp = await userService.findByEmail(userdb.email);

        console.log(isSignUp);

        if(isSignUp == null) { // Check sign up
            await userService.add(userdb);
        }

        req.session.auth = true;
        req.session.authUser = userdb;

        const url = '/';
        res.redirect(url);
    },
}