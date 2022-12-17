import userService from "../services/user.service.js";

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
    }


}