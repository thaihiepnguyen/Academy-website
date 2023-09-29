import express from "express";
import nodemailer from "nodemailer";
import accountService from "../services/account.service.js";
import bcrypt from "bcrypt";
import multer from "multer";
import auth from "../middlewares/auth.mdw.js";
import coursesService from "../services/courses.service.js";
import watchListService from "../services/watch-list.service.js";
import passportFacebook from "../utils/passport-facebook-setup.js";
import shoppingService from "../services/shopping.service.js";

const router = express.Router();

router.get("/login", function (req, res) {
	let signup_message = false;
	if (req.session.url !== null) {
		signup_message = true;
	}
	res.render("vwLogin/login", { signup_message });
});

router.post("/login", async function (req, res) {
	const { email, password } = req.body;
	const user = await accountService.findByEmail(email);

	if (user == null) {
		return res.render("vwLogin/login", {
			err_message: "Invalid email or password.",
			isDefault: true,
		});
	} else if (user.password == null) {
		return res.render("vwLogin/login", {
			err_message: "Invalid email or password.",
			isDefault: true,
		});
	} else if (!bcrypt.compareSync(password, user.password)) {
		return res.render("vwLogin/login", {
			err_message: "Invalid email or password.",
			isDefault: true,
		});
	} else if (user.enable === 0) {
		return res.render("vwLogin/login", {
			err_message: "You're locked by Admin!",
			isDefault: true,
		});
	} else {
		req.session.userBuffer = null;
		req.session.auth = true;
		req.session.authUser = user;

		req.session.authUser.instructor = user.role_id === 2;
		req.session.authUser.admin = user.role_id === 3;

		const url = "/";
		res.redirect(url);
	}
});

router.get("/register", function (req, res) {
	res.render("vwRegister/signup");
});

router.post("/register/otp", async function (req, res) {
	req.session.userBuffer = req.body;
	const { email } = req.body;

	const users = await accountService.findAll();
	let isEmailExists = false;

	for (let user of users) {
		if (user.email === email) {
			isEmailExists = true;
		}
	}

	if (!isEmailExists) {
		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "thaihiep232002@gmail.com",
				pass: "llhoowfpfmbyiocg",
			},
		});

		const code = Math.floor(1000 + Math.random() * 9000);

		req.session.otp = code;
		await transporter.sendMail({
			from: "The Academy App", // sender address
			to: `${email}`, // list of receivers
			subject: "Code", // Subject line
			text: `${code}`, // plain text body
		});

		res.render("vwRegister/vwOtp/otp", {
			isDefault: true,
			email: email,
		});
	} else {
		res.render("vwRegister/signup", {
			message: "Email is existed",
			isDefault: true,
		});
	}
});

router.post("/register", async function (req, res) {
	const rawPass = req.session.userBuffer.password;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(rawPass, salt);
	req.session.userBuffer.password = hash;
	let { otp } = req.body;

	if (+otp === req.session.otp) {
		// register successfully
		res.locals.signup_message = true;
		const user = {
			...req.session.userBuffer,
			image: "/public/imgs/avt/0.png",
			role_id: 1,
		};

		await accountService.add(user);
		req.session.url = req.originalUrl;
		res.redirect("/account/login/");
	} else {
		// otp is not correct

		res.render("vwRegister/vwOtp/otp.hbs", {
			message: "OTP is not correct",
			email: req.session.userBuffer.email,
			isDefault: true,
		});
	}

	req.session.otp = null;
});

router.post("/logout", function (req, res) {
	req.session.auth = false;
	req.session.authUser = null;

	const url = req.headers.referer || "/";
	res.redirect(url);
});

// have to log in to view!!!
router.get("/profile", auth.withLoginPermission(), function (req, res) {
	res.render("vwAccount/profile.hbs", {
		layout: "main-profile",
		isPage1: true,
	});
});

router.post("/profile", async function (req, res) {
	const user = res.locals.authUser;

	let type = "";

	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "./public/imgs/avt");
		},
		filename: function (req, file, cb) {
			const typeOfFile = file.originalname.substring(file.originalname.indexOf("."), file.originalname.length);
			type = typeOfFile;
			cb(null, user.id + typeOfFile);
		},
	});
	const upload = multer({ storage });

	upload.array("avatar", 1)(req, res, async function (err) {
		for (let item in req.body) {
			if (req.body[item] === "") {
				req.body[item] = undefined;
			}
		}
		const { email, firstname, lastname } = req.body;
		if (err) {
			console.log(err);
		}

		let imageURL = "";
		if (type !== "") {
			imageURL = "/public/imgs/avt/" + user.id + type;
		} else {
			imageURL = user.image;
		}

		const changedUser = {
			email: email,
			firstname: firstname,
			lastname: lastname,
			image: imageURL,
			id: user.id,
		};

		await accountService.patch(changedUser);

		const updatedUser = await accountService.findById(user.id);

		req.session.authUser = updatedUser;
		res.locals.authUser = updatedUser;

		res.render("vwAccount/profile.hbs", {
			layout: "main-profile",
			success_message: "Successfully!",
			isPage1: true,
		});
	});
});

router.get("/profile/security", auth.withLoginPermission(), function (req, res) {
	res.render("vwAccount/account_security.hbs", {
		layout: "main-profile",
		isPage2: true,
	});
});

router.post("/profile/security", async function (req, res) {
	const user = res.locals.authUser;

	const { oldPassword, newPassword, repeatNewPassword } = req.body;

	const userdb = await accountService.findById(user.id);

	if (newPassword !== repeatNewPassword || !bcrypt.compareSync(oldPassword, userdb.password)) {
		return res.render("vwAccount/account_security.hbs", {
			layout: "main-profile",
			err_message: "Password change failed!",
			isPage2: true,
		});
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(newPassword, salt);

	const changedUser = {
		id: user.id,
		password: hash,
	};

	await accountService.patch(changedUser);

	const updatedUser = await accountService.findById(user.id);
	req.session.authUser = updatedUser;
	res.locals.user = updatedUser;

	return res.render("vwAccount/account_security.hbs", {
		layout: "main-profile",
		success_message: "Successfully!",
		isPage2: true,
	});
});
router.get("/profile/regis-courses", auth.withLoginPermission(), function (req, res) {
	res.render("vwAccount/registered_courses.hbs", {
		layout: "main-profile",
		isPage3: true,
	});
});

router.get("/profile/upload-video", auth.withLoginPermission(), function (req, res) {
	res.render("vwAccount/upload_video.hbs", {
		layout: "main-profile",
		isPage4: true,
	});
});

router.get("/profile/watch-list", auth.withLoginPermission(), async function (req, res) {
	//
	const user = res.locals.authUser;
	const list = await watchListService.findByUserID(user.id);

	const courses = [];
	for (let item of list) {
		courses.push(await coursesService.findById(item.course_id));
	}

	let enrollList = null;
	if (typeof user !== "undefined") enrollList = await shoppingService.findByUserID(user.id);

	for (let course of courses) {
		if (enrollList !== null)
			for (let item of enrollList) {
				if (item.course_id === course.id) {
					course.isEnrolled = true;
				}
			}
	}
	res.render("vwAccount/watch_list.hbs", {
		layout: "main-profile",
		isPage5: true,
		courses: courses,
	});
});

router.get("/facebook", passportFacebook.authenticate("facebook", { scope: "email" }));

router.get("/facebook/callback", passportFacebook.authenticate("facebook", { failureRedirect: "/login" }), async function (req, res) {
	const { user } = req;

	const userdb = {
		...req.body, // can not need
		email: user.emails[0].value,
		firstname: user._json.name,
		lastname: user.name.familyName,
		image: user.photos[0].value,
		role_id: 1,
	};

	let userOfficial = await accountService.findByEmail(userdb.email);

	if (userOfficial == null) {
		await accountService.add(userdb);
	}
	req.session.auth = true;
	userOfficial = await accountService.findByEmail(userdb.email);

	req.session.authUser = userOfficial;

	req.session.authUser.instructor = userOfficial.role_id === 2;
	req.session.authUser.admin = userOfficial.role_id === 3;

	res.redirect("/");
});

router.get("/forgot-password", function (req, res) {
	res.render("vwLogin/fg-password");
});

router.post("/forgot-password", async function (req, res) {
	const { email } = req.body;

	const user = await accountService.findByEmail(email);
	const isExistEmail = user !== null;

	if (!isExistEmail) {
		return res.render("vwLogin/fg-password", {
			err_message: "Email does not exist!",
		});
	} else {
		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "thaihiep232002@gmail.com",
				pass: "llhoowfpfmbyiocg",
			},
		});

		function generatePassword() {
			let length = 8,
				charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
				retVal = "";
			let i = 0,
				n = charset.length;
			for (; i < length; ++i) {
				retVal += charset.charAt(Math.floor(Math.random() * n));
			}
			return retVal;
		}

		const generatorPassword = generatePassword();

		await transporter.sendMail({
			from: "The Academy App", // sender address
			to: `${email}`, // list of receivers
			subject: "Password", // Subject line
			text: `new password is "${generatorPassword}"`, // plain text body
		});

		const salt = bcrypt.genSaltSync(10);
		user.password = bcrypt.hashSync(generatorPassword, salt);

		await accountService.patch(user);

		res.redirect("/account/login");
	}
});

router.get("/resendOTP", async function (req, res) {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "thaihiep232002@gmail.com",
			pass: "llhoowfpfmbyiocg",
		},
	});

	const code = Math.floor(1000 + Math.random() * 9000);

	req.session.otp = code;
	await transporter.sendMail({
		from: "The Academy App", // sender address
		to: `${req.session.userBuffer.email}`, // list of receivers
		subject: "Code", // Subject line
		text: `${code}`, // plain text body
	});

	res.render("vwRegister/vwOtp/otp", {
		isDefault: true,
		email: req.session.userBuffer.email,
	});
});

export default router;
