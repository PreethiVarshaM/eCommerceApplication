import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import session from 'express-session';
import passport from 'passport';
import { ensureLoggedIn } from 'connect-ensure-login';

import cors from 'cors';

import User from './User.js';
import Product from './Product.js';
import Warehouse from './Warehouse.js';
import Order from './Order.js';
import Cart from './Cart.js';


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

// ------------------------------------------ Sign Up ------------------------------------------
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

        //create cart for user
        const newCart = new Cart({
            customerId: newUser._id,
            items: []
        });
        await newCart.save();
        await newUser.save();
        console.log("newuser")
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ------------------------------------------ Login ------------------------------------------
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

// ------------------------------------------ Product transactions ------------------------------------------

// ------------------------------------------ Add Product ------------------------------------------

app.post('/addProduct', async (req, res) => {

    try {
        // Check if the product already exists in the database
        const existingProduct = await Product.findOne({ name: req.body.name });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product already exists' });
        }


        // Create a new product with data from the request body
        const newProduct = new Product({
            name: req.body.name,
            quantity: req.body.quantity,
            cost: req.body.cost,
            discount: req.body.discount,
            advertiserId: req.body.sellerId,
            sellerId: req.body.sellerId,
            warehouse: Math.floor(Math.random() * 4) + 1,
        });
        // Save the new product to the database

        await newProduct.save();

        // Return a success message with the new product data
        res.status(201).json({
            message: 'Product added successfully!',
            product: newProduct,
        });
    } catch (error) {
        // Return an error message if there was a problem saving the product
        res.status(500).json({ error: error.message });
    }
});

// ------------------------------------------ Get All Products ------------------------------------------
app.get('/getallproducts', async (req, res) => {
    try {
        // Get all products from the database
        const products = await Product.find();

        // Return the products list with a success message
        res.status(200).json({
            message: 'Products retrieved successfully',
            products: products,
        });
    } catch (error) {
        // Return an error message if there was a problem retrieving the products
        res.status(500).json({ error: error.message });
    }
});

//------------------------------ get Product details ------------------------------------
app.post('/getproduct', async (req, res) => {

    //console.log(req.body.productId)
    try {
        const product = await Product.findById(req.body.productId);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving product details');
    }
});

//------------------------------ add to cart ------------------------------------

app.post('/addtocart', async (req, res) => {
    try {

        //console.log(req.body.pid)
        const cart = await Cart.findOne({ customerId: req.body.customerId });
        //console.log(cart)
        if (!cart) {
            console.log('new cart')
            const newCart = new Cart({ customerId: req.body.customerId, items: [{ productId: req.body.pid._id, quantity: 1 }] });
            await newCart.save();
            return res.status(201).send({ message: 'Product added to cart' });
        }

        //console.log('existing cart')
        const existingItem = cart.items.find((item) => item.productId.toString() === req.body.pid._id.toString());

        //console.log('x', existingItem)
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ productId: req.body.pid._id, quantity: 1 });
        }
        //console.log('y')
        await cart.save();

        res.send({ message: 'Product added to cart' });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }


})

//------------------------------ get cart ------------------------------------
app.post('/getcart', async (req, res) => {
    try {
        //console.log(req.body)
        const cart = await Cart.findOne({ customerId: req.body.customerId });
        if (cart) {
            res.status(200).json(cart);
        }
        else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//------------------------------ delete from cart ------------------------------------
app.post('/deletefromcart', async (req, res) => {
    try {

        const cart = await Cart.findOne({ customerId: req.body.customerId });
        if (cart) {
            const newCart = await Cart.findOneAndUpdate({ customerId: req.body.customerId }, { $pull: { items: { productId: req.body.productId } } }, { new: true });
            res.status(200).json(newCart);
        }
        else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//------------------------------ update cart ------------------------------------
app.post('/updatecart', async (req, res) => {
    try {
        // update quantity of product in cart using prdtid and custid and quantity
        console.log(req.body)
        const cart = await cart.findOneAndUpdate({ customerId: req.body.customerId, "items.productId": req.body.productId }, { $set: { "items.$.quantity": req.body.quantity } }, { new: true });
        if (cart) {
            res.status(200).json(cart);
        }
        else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//------------------------------ place order ------------------------------------
app.post('/placeorder', async (req, res) => {
    try {
        // create new order
        const newOrder = new Order({
            customerId: req.body.customerId,
            items: req.body.items,
            total: req.body.total,
            status: req.body.status,
            date: req.body.date
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//------------------------------ get all orders of user ------------------------------------
app.post('/getorders', async (req, res) => {
    try {
        const orders = await Order.find({ customerId: req.body.customerId });
        if (orders) {
            res.status(200).json(orders);
        }
        else {
            res.status(404).json({ message: 'Orders not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});