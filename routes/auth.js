const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SECRET_KEY } = require('../config');

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message });
        req.logIn(user, (err) => {
            if (err) return next(err);
            const token = jwt.sign({ id: user.id }, SECRET_KEY);
            return res.json({ token });
        });
    })(req, res, next);
});

// Signup
router.post('/signup', async (req, res, next) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already taken' });
        const user = new User({ first_name, last_name, email, age, password });
        await user.save();
        const token = jwt.sign({ id: user.id }, SECRET_KEY);
        return res.json({ token });
    } catch (err) {
        next(err);
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
});

// Current user
router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
