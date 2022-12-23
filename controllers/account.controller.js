import userService from "../services/user.service.js";
import bcrypt from "bcrypt";
import multer from 'multer';
import * as constants from "constants";

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

            const url = req.headers.referer || '/';
            res.redirect(url);
        }
    },

    getHomeProfilePage: (req, res) => {
        res.render('vwProfile/public_profile.hbs', {
            activeProfileLayout: true,
            // isDefault: true,
            //user: req.session.authUser,
        });
    },

    editUserProfile: (req, res) => {
        let type = ""; 
        const user = res.locals.user;
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, './public/imgs/avt');
            },
            filename: function (req, file, cb) {
                const typeOfFile = file.originalname.substring(file.originalname.indexOf('.'), file.originalname.length);
                type = typeOfFile;
              cb(null, user.id + typeOfFile);
            }
          })
          
        const upload = multer({ storage });

        upload.array('avt', 1)(req,res, async function(err) {
            if(err) {
                console.log(err);
            }
            
            const {email, firstname, lastname} = req.body;

            let imageURL = ''; 
            if (type !== '') {
                imageURL = '/imgs/avt/' + user.id + type; 
            } else {
                imageURL = user.image;
            }
            
            const changedUser = {
                email: email,
                firstname: firstname,
                lastname: lastname,
                id: user.id,
                image: imageURL,
                role_id: user.role_id
            }

            console.log(changedUser);
    
            await userService.patch(changedUser);

            req.session.authUser = changedUser;
            res.locals.user = changedUser;
            res.render('vwProfile/public_profile.hbs', {
                activeProfileLayout: true,
            });
        });
    },

    getAccountSecurityPage: (req, res) => {
        res.render('vwProfile/account_security.hbs', {
            activeProfileLayout: true,
        });
    },

    editUserPassword: async (req, res) => {
        const user = res.locals.user;
        console.log(user);

        const {email, oldPassword, newPassword, repeatNewPassword} = req.body;

        const userdb = await userService.findByEmail(email);

        if(newPassword != repeatNewPassword || !bcrypt.compareSync(oldPassword, userdb.password)) {
            return res.render("vwProfile/account_security.hbs", {
                activeProfileLayout: true,
                err_message: "Password change failed!"
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        const changedUser = {
            email: email,
            firstname: userdb.firstname,
            lastname: userdb.lastname,
            id: userdb.id,
            image: userdb.image,
            role_id: userdb.role_id,
            password: hash
        }

        await userService.patch(changedUser);

        return res.render("vwProfile/account_security.hbs", {
            activeProfileLayout: true,
            success_message: "Successfully!"
        });
    },

    getPhotoPage: (req, res) => {
        return res.render("vwProfile/photo.hbs", {
            activeProfileLayout: true
        });
    },

    getWatchListPage: async (req, res) => {
        const user = res.locals.user;

        const courses = await userService.findWatchList(user.id);

        for (let i = 0; i < courses.length; i++) {
            let ratings = ["", "", "", "", ""];
            for (let j = 0; j < courses[i].rating; j++) {
                ratings[j] = "rating-color";
            }
            courses[i].ratings = ratings;
        }

        return res.render("vwProfile/watch_list.hbs", {
            activeProfileLayout: true,
            courses
        });
    },

    getRegisteredCoursesPage: async (req, res) => {
        const user = res.locals.user;

        const courses = await userService.findRegisteredCourses(user.id);

        for (let i = 0; i < courses.length; i++) {
            let ratings = ["", "", "", "", ""];
            for (let j = 0; j < courses[i].rating; j++) {
                ratings[j] = "rating-color";
            }
            courses[i].ratings = ratings;
        }

        return res.render("vwProfile/registered_courses.hbs", {
            activeProfileLayout: true,
            courses
        });
    },

    getLogOutPage: (req, res) => {
        req.session.auth = false;
        req.session.authUser = null;

        const url = req.headers.referer || '/';
        res.redirect(url);
    },

    handleLogout: (req, res) => {

        req.session.auth = false;
        req.session.authUser = null;

        const url = req.headers.referer || '/';
        res.redirect(url);

    },

    callbackGoogle: async (req, res) => {
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

        const userOfficial = userService.findByEmail(userdb.email);

        req.session.auth = true;
        req.session.authUser = userOfficial;

        const url = '/';
        res.redirect(url);
    },

    callbackFacebook: async (req, res) => { // not working
        const { user } = req;

        const userdb = {
            ...req.body,
            email: user.emails[0].value,
            firstname: user._json.name,
            //lastname: user.name.familyName,
            //image: user.photos[0].value,
            role_id: 1,
        };

        const isSignUp = await userService.findByEmail(userdb.email);


        if(isSignUp == null) { // Check sign up
            await userService.add(userdb);
        }

        const userOfficial = userService.findByEmail(userdb.email);


        req.session.auth = true;
        req.session.authUser = userOfficial;

        req.session.auth = true;

        res.redirect('/');
    },
}