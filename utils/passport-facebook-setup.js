import passport from "passport";
import passportFacebook from 'passport-facebook';

const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
        clientID: "2814293142048774",
        clientSecret: "8f93085e467644d5bff625101cdb7efa" ,
        callbackURL: "http://localhost:3000/account/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {

        return done(null, profile);
    }
));

export default passport;