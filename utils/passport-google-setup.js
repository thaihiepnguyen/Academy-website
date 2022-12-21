import passport from "passport";
import passportGoogle from 'passport-google-oauth20';

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

        return done(null, profile);
    }
));

export default passport;