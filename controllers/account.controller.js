import userService from "../services/user.service.js";
import bcrypt from "bcrypt";
import multer from 'multer';
import nodemailer from "nodemailer";

export default {
    getLoginPage: (req, res) => {
        const role = req.params.role;
        res.render('vwlogin/login.hbs', {
            isDefault: true,
            role: role
        });
    },

    handleSignup: async (req, res) => {
        const role = req.params.role;
        const rawPass = req.session.userBuffer.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(rawPass, salt);
        req.session.userBuffer.password = hash;
        let otp = "";
        for (let index in req.body) {
            otp += req.body[index];
        }

        let otpRaw = parseInt(otp);

        if (otpRaw === req.session.otp) {
            // đăng ký thành công
            const user = {
                ...req.session.userBuffer,
                image: null,
                role_id: 1,
            };

            await userService.add(user);

            res.redirect('/account/login');
        } else {
            // sai otp

            res.render('vwSignup/otp.hbs', {
                message: "OTP is not correct",
                email: req.session.userBuffer.email,
                isDefault: true
            })
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


        req.session.isStudent = false;
        req.session.isLecture = false;
        req.session.isAdmin = false;


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
        else if(userdb.enable === 0) {
            return res.render("vwlogin/login.hbs", {
                err_message: "You had locked by admin.",
                isDefault: true,
            });
        }
        else{

            req.session.auth = true;
            req.session.authUser = userdb;

            if (userdb.role_id == 1) {
                req.session.isStudent = true;
                req.session.url_home = "/";
                const url = '/';
                res.redirect(url);
            }
            if (userdb.role_id == 2) {
                req.session.isLecture = true;
                req.session.url_home = "/lecture";
                console.log("Lecture");

                const url = '/lecture';
                res.redirect(url);
            }
            if (userdb.role_id == 3) {
                req.session.isAdmin = true;
                req.session.url_home = "/admin";

                const url = '/';
                res.redirect(url);
            }
        }
    },

    getHomeProfilePage: (req, res) => {
        res.locals.active_pf = "active";
        res.render('vwProfile/public_profile.hbs', {
            activeProfileLayout: true,
        });
    },

    editUserProfile:async (req, res) => {
        const user = res.locals.user;

        const {email, firstname, lastname} = req.body;

        const changedUser = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            id: user.id,
        };

        await userService.patch(changedUser);

        const updatedUser = await userService.findById(user.id);

        req.session.authUser = updatedUser
        res.locals.user = updatedUser;

        res.render('vwProfile/public_profile.hbs', {
            activeProfileLayout: true,
            active_pf: "active",
            success_message: "Successfully!"
        });
    },

    getAccountSecurityPage: (req, res) => {
        res.locals.active_sc = "active";
        res.render('vwProfile/account_security.hbs', {
            activeProfileLayout: true,

        });
    },

    editUserPassword: async (req, res) => {
        const user = res.locals.user;

        const {email, oldPassword, newPassword, repeatNewPassword} = req.body;

        const userdb = await userService.findByEmail(email);

        if(newPassword != repeatNewPassword || !bcrypt.compareSync(oldPassword, userdb.password)) {
            return res.render("vwProfile/account_security.hbs", {
                activeProfileLayout: true,
                active_sc: "active",
                err_message: "Password change failed!"
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        const changedUser = {
            id: user.id,
            password: hash
        }

        await userService.patch(changedUser);

        const updatedUser = await userService.findById(user.id);
        req.session.authUser = updatedUser
        res.locals.user = updatedUser;

        return res.render("vwProfile/account_security.hbs", {
            activeProfileLayout: true,
            active_sc: "active",
            success_message: "Successfully!"
        });
    },

    getPhotoPage: (req, res) => {
        res.locals.active_pt = "active";
        return res.render("vwProfile/photo.hbs", {
            activeProfileLayout: true,
        });
    },

    getWatchListPage: async (req, res) => {
        res.locals.active_wl = "active";
        const user = res.locals.user;

        const courses = await userService.findWatchList(user.id);
        if(courses == null){
            return res.render("vwProfile/watch_list.hbs", {
                activeProfileLayout: true,
                message_no_watch_list : "No your watch list",
            });
        }
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

    deleteWatchListPage: async (req, res) => {

        const course_id = req.params.id;
        const user_id = req.session.authUser.id;

        const url = req.headers.referer || '/';

        if(user_id == null || user_id == '') {
            res.redirect(url);
        }

        await userService.deleteCourseInWatchList(user_id, course_id);

        res.redirect(url);
    },

    addWatchListPage: async (req, res) => {

        const course_id = req.params.id;
        const user_id = req.session.authUser.id;

        const url = req.headers.referer || '/';


        if(typeof user_id === 'undefined') {
            res.redirect(url);
        }

        await userService.addCourseInWatchList(user_id, course_id);

        res.redirect(url);
    },

    getRegisteredCoursesPage: async (req, res) => {
        res.locals.active_rc = "active";
        const user = res.locals.user;

        const courses = await userService.findRegisteredCourses(user.id);
        if(courses == null){
            return res.render("vwProfile/registered_courses.hbs", {
                activeProfileLayout: true,
                message_no_registered_courses : "No registered courses"
            });
        }
        for (let i = 0; i < courses.length; i++) {
            let ratings = ["", "", "", "", ""];
            for (let j = 0; j < courses[i].rating; j++) {
                ratings[j] = "rating-color";
            }
            courses[i].ratings = ratings;
            const isActive = await userService.checkCourseInWatchList(user.id, courses[i].id);
            if (isActive.length > 0) {
                courses[i].check = true;
            }
        }

        return res.render("vwProfile/registered_courses.hbs", {
            activeProfileLayout: true,
            courses
        });
    },

    getLogOutPage: (req, res) => {
        res.locals.active_lg = "active";
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
        const { user } = req;

        const userdb = {
            ...req.body,
            email: user.emails[0].value,
            firstname: user._json.name,
            lastname: user.name.familyName,
            image: user.photos[0].value,
            role_id: 1,
            enable: 1
        };

        const userOfficial = await userService.findByEmail(userdb.email);


        if(userOfficial == null) {
            await userService.add(userdb);
        }

        req.session.auth = true;
        req.session.authUser = await userService.findByEmail(userdb.email);

        const User = req.session.authUser;
        if(User.enable === 0) {
            return res.render("vwlogin/login.hbs", {
                err_message: "You had locked by admin.",
                isDefault: true,
            });
        }

        res.redirect('/');
    },

    callbackFacebook: async (req, res) => {
        const { user } = req;

        const userdb = {
            ...req.body, // can not need
            email: user.emails[0].value,
            firstname: user._json.name,
            lastname: user.name.familyName,
            image: user.photos[0].value,
            role_id: 1,
            enable:1
        };

        const userOfficial = await userService.findByEmail(userdb.email);


        if(userOfficial == null) {
            await userService.add(userdb);
        }
        req.session.auth = true;
        req.session.authUser = await userService.findByEmail(userdb.email);

        const User = req.session.authUser;

        if(User.enable === 0) {
            return res.render("vwlogin/login.hbs", {
                err_message: "You had locked by admin.",
                isDefault: true,
            });
        }

        res.redirect('/');
    },

    uploadPhoto: (req, res) => {
        const user = res.locals.user;
        let type = "";

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/imgs/avt');
            },
            filename: function (req, file, cb) {
                const typeOfFile = file.originalname.substring(file.originalname.indexOf('.'), file.originalname.length);
                type = typeOfFile;
                cb(null, user.id + typeOfFile);
            }
        });

        const upload = multer({ storage });

        upload.array('avt', 1)(req,res, async function(err) {
            if(err) {
                console.log(err);
            }

            let imageURL = '';
            if (type !== '') {
                imageURL = '/imgs/avt/' + user.id + type;
            } else {
                imageURL = user.image;
            }

            const changedUser = {
                id: user.id, // key is necessary :))
                image: imageURL,
            }

            await userService.patch(changedUser);

            req.session.authUser.image = changedUser.image;
            res.locals.user.image = changedUser.image;

            res.render('vwProfile/photo.hbs', {
                activeProfileLayout: true,
                active_pt: "active",
                success_message: "Successfully!"
            });
        });
    },

    sendVerifyMail: async (req, res) => {
        const role = req.params.role;
        req.session.userBuffer = req.body;
        const { email } = req.body;

        const entity = await userService.findAll();
        let isEmailExists = false;

        for (let item of entity) {
            if (item.email === email) {
                isEmailExists = true;
            }
        }

        if (!isEmailExists) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'thaihiep232002@gmail.com',
                    pass: 'llhoowfpfmbyiocg',
                },
            });

            const code = Math.floor(1000 + Math.random() * 9000);
            req.session.otp = code;
            await transporter.sendMail({
                from: 'The Academy App', // sender address
                to: `${email}`, // list of receivers
                subject: "Code", // Subject line
                text: `${code}`, // plain text body
            });

            res.render('vwSignup/otp.hbs', {
                isDefault: true,
                email: email,
                role: role
            });
        } else {
            res.render('vwSignup/signup', {
                message: "Email is existed",
                isDefault: true,
                role: role
            });
        }
    }
}