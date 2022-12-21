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
            res.redirect('/account/login');
        } else {
            res.render('vwSignup/signup', {
                message: "Email is existed",
                isDefault: true,
            });
        }
    },

    getSignupPage: (req, res) => {
        res.render('vwSignup/signup.hbs', {
            isDefault: true,
        });
    },

    handleLogin: async (req, res) => {
        const { email, password } = req.body;
        const userdb = await userService.findByEmail(email);

        if(userdb == null) {
            return res.render("vwlogin/login.hbs", {
                err_message: "Invalid email or password.",
                isDefault: true,
            });
        }
        else if(!bcrypt.compareSync(password, userdb.password)) {
            return res.render("vwlogin/login.hbs", {
                err_message: "Invalid email or password.",
                isDefault: true,
            });
        }
        else{
            req.session.auth = true;
            req.session.authUser = userdb;

            const url = req.session.retUrl;
            res.redirect(url);
        }
    },

    getHomeProfilePage: (req, res) => {
        res.render('vwProfile/public_profile.hbs', {
            activeProfileLayout: true,
            // isDefault: true,
            // user: req.session.authUser,
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


        if(isSignUp == null) { // Check sign up
            await userService.add(userdb);
        }

        req.session.auth = true;
        req.session.authUser = userdb;

        const url = '/';
        res.redirect(url);
    },
}