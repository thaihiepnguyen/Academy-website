import passport from "passport";
import passportGoogle from 'passport-google-oauth20';
import userService from "../services/user.service.js";

//const passport = passport();
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleStrategy = passportGoogle.Strategy;


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: "17191422173-tuh2vma918qcdro1qfeemcv5mghesrch.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/account/google/callback"
    },
    async function(req, accessToken, refreshToken, profile, done) {

        // const user = {
        //     ...req.body,
        //     email: profile.emails[0].value,
        //     firstname: profile.name.givenName,
        //     lastname: profile.name.familyName,
        //     image: profile.photos[0].value,
        //     role_id: 1,
        // };
        //
        // const isSignUp = await userService.findByUsername(user.email);
        //
        // console.log(isSignUp);
        //
        // if(isSignUp == null) { // Check sign up
        //     await userService.add(user);
        // }

        return done(null, profile);
    }
));

export default passport;