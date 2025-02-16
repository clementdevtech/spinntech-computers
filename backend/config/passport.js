const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const { JWT_SECRET, GOOGLE_AUTH, FACEBOOK_AUTH } = require('./dotenv');

// 🔹 JWT Authentication Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};

passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (!user) return done(null, false);
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    })
);

// 🔹 Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_AUTH.CLIENT_ID,
            clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
            callbackURL: GOOGLE_AUTH.CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        }
    )
);

// 🔹 Facebook OAuth Strategy
passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_AUTH.CLIENT_ID,
            clientSecret: FACEBOOK_AUTH.CLIENT_SECRET,
            callbackURL: FACEBOOK_AUTH.CALLBACK_URL,
            profileFields: ['id', 'displayName', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ facebookId: profile.id });
                if (!user) {
                    user = await User.create({
                        facebookId: profile.id,
                        name: profile.displayName,
                        email: profile.emails ? profile.emails[0].value : ''
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        }
    )
);

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
