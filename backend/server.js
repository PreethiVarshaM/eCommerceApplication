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
app.post('/signup', async (req, res) => {
    //console.log("signup")
    try {
        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            // console.log("user already exists")
            return res.status(409).json({ error: 'User already exists' });
        }
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            address: {
                dno: req.body.address.dno,
                street: req.body.address.street,
                pinCode: req.body.address.pinCode,
                city: req.body.address.city,
                State: req.body.address.State,
                Country: req.body.address.Country
            },
            isSeller: req.body.isSeller,
            isAdmin: req.body.isAdmin,
            isAdvertiser: req.body.isAdvertiser,

        });

        await newUser.save();
        console.log("newuser")
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login',
    async (req, res) => {
        try {
            const validate = await User.findOne({ username: req.body.username, password: req.body.password });
            if (validate) {
                //console.log("validated login")
                return res.status(200).json({
                    success: validate,
                });
            }
            else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});