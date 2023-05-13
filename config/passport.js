const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./config');

// Estrategia de autenticación local
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Estrategia de autenticación JWT
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload._id);

        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Serialización y deserialización de usuarios
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
});
