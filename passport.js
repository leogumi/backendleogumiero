const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // Aquí podrías buscar al usuario en la base de datos
        // Si no existe, podrías crearlo y guardar sus datos en la base de datos
        return done(null, profile);
    }
));

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/products');
    });
