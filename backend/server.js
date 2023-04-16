import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import session from 'express-session';
import passport from 'passport';
import { ensureLoggedIn } from 'connect-ensure-login';

import cors from 'cors';

import User from './User.js';

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Move these to a config file
const PORT = 5000 | process.env.PORT;
const MONGODB_URL = "mongodb://localhost:27017/DBMSecommerce";
const SESSION_SECRET = "dbmsECommerce";

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Successfully connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log('Error in connecting to MongoDB', err);
});

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// TODO: Create a route for these
app.post('/signup', (req, res) => {
    register(req.body, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            passport.authenticate('local')(req, res, () => {
                res.send('Signed up');
            });
        }
    });
});

app.get('/secret', ensureLoggedIn('/'), (req, res) => {
    res.send('Congrats! You are logged in');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/home');
    }
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});