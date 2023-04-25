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
import BankAccount from './BankAccount.js';
import SellerTransaction from './SellerTransaction.js';
import AdminTransaction from './AdminTransaction.js';
import DiscountCoupon from './DiscountCoupon.js';


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

// ---- dummy bank accounts ----
const admin = new User({
    username: 'admin',
    password: 'admin',
    name: 'admin',
    phone_number: '1234567890',
    email: 'admin@mail.com',
    address: {
        dno: '1',
        street: '1',
        pinCode: '1',
        city: '1',
        State: '1',
        Country: '1'
    },
    isSeller: false,
    isAdmin: true,
    isAdvertiser: false

});
admin.save();

const bankAccounts = [
    {
        userId: '6443aa5c380c3bc1cd3c93fe',
        bankId: '1',
        bankName: 'Bank1',
        accountId: '1',
        accountBalance: 10000000
    },
    {
        userId: '6447473ceb77d34063ce661a',
        bankId: '1',
        bankName: 'Bank1',
        accountId: '2',
        accountBalance: 100000,
    },
    {
        userId: admin._id,
        bankId: '1',
        bankName: 'Bank1',
        accountId: '3',
        accountBalance: 1000000,
    }, {
        userId: '6447f2479f51192f91dd89a5',
        bankId: '1',
        bankName: 'Bank1',
        accountId: '4',
        accountBalance: 100000,
    }]

bankAccounts.forEach((bankAccount) => {
    const newBankAccount = new BankAccount(bankAccount);
    newBankAccount.save();
});

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
        //console.log(req.body)
        const cartItems = req.body.cartItems
        const customerId = req.body.userId
        const total = req.body.totalCost

        const arr = []

        for (let i = 0; i < cartItems.length; i++) {

            //find product in product collection
            const p = await Product.findById(cartItems[i].productId)
            arr.push({
                product: p._id,
                quantity: cartItems[i].quantity,
                price: p.cost,
                discount: 0,
            })

        }

        // create new order
        const newOrder = new Order({
            customer: customerId,
            products: arr,
            total: total,
            status: 'Pending',
            date: new Date(),
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//------------------------------ get all orders of user ------------------------------------
app.post('/getallorders', async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.body.customerId });
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

// ------------------------------ update order payment ------------------------------------
app.post('/updateorderpayment', async (req, res) => {
    try {

        console.log(req.body)
        const bank = await BankAccount.findOne({ userId: req.body.customerId });

        const order = await Order.findByIdAndUpdate(req.body.orderId, { $set: { paymentStatus: req.body.paymentStatus } }, { new: true });
        if (bank.accountBalance >= order.total) {
            await order.updateOne({ $set: { payment: true, status: 'Shipped' } });
            await bank.updateOne({ $inc: { accountBalance: -order.total } });

            //fetch bank account of seller and increment balance
            for (let i = 0; i < order.products.length; i++) {
                const prdt = await Product.findById(order.products[i].product);
                const seller = await User.findById(prdt.sellerId);
                const sellerBank = await BankAccount.findOne({ userId: seller._id });
                await sellerBank.updateOne({ $inc: { accountBalance: 0.9 * order.products[i].price } });
                const newTransaction = new SellerTransaction({
                    sellerId: seller._id,
                    orderId: order._id,
                    productId: order.products[i].product,
                    amount: order.products[i].price,
                    customerId: req.body.customerId,
                });
                await newTransaction.save();



            }
            const newAdminTransaction = new AdminTransaction({
                customerId: req.body.customerId,
                orderId: order._id,
                amount: order.total * 0.1,
            });
            await newAdminTransaction.save();

            Cart.update({ customerId: req.body.customerId }, { $set: { items: [] } }, function (err, affected) {
                console.log('affected: ', affected);
            });
            //console.log(await Order.findByIdAndUpdate(req.body.orderId, { $set: { paymentStatus: req.body.paymentStatus } }, { new: true }))
            res.status(200).json(order);
        }
        else {
            res.status(404).json({ message: 'Balance insufficient' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// ------------------------------ update order location ------------------------------------
app.post('/updateorderlocation', async (req, res) => {
    try {
        const order = await Order.find({ _id: req.body.orderId });
        if (order) {
            const newOrder = await Order.findByIdAndUpdate(req.body.orderId, { $set: { location: req.body.location } }, { new: true });
            res.status(200).json(newOrder);
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ------------------------------ get admin transaction ------------------------------------
app.post('/getadmintransaction', async (req, res) => {
    try {
        const transactions = await AdminTransaction.find();
        if (transactions) {
            res.status(200).json(transactions);
        }
        else {
            res.status(404).json({ message: 'Admin Transactions not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ------------------------------ get seller transaction ------------------------------------
app.post('/getsellertransaction', async (req, res) => {
    try {
        //console.log(req.body)
        const transactions = await SellerTransaction.find({ sellerId: req.body.sellerID });

        if (transactions) {
            res.status(200).json(transactions);
        }
        else {
            res.status(404).json({ message: 'Seller Transactions not found' });
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//------------------------------ create coupon ------------------------------------
app.post('/createcoupon', async (req, res) => {
    try {
        const bank = await BankAccount.findOne({ userId: req.body.advertiserId });

        const coupon = new DiscountCoupon({
            advertiserId: req.body.advertiserId,
            couponCode: req.body.couponCode,
            discountPercentage: parseInt(req.body.discountPercent),
            advertiserAccount: bank.accountId,
        });

        await coupon.save();

        res.status(201).send(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating coupon');
    }
});

//------------------------------ get all coupons ------------------------------------
app.get('/getallcoupons', async (req, res) => {
    try {
        const coupons = await DiscountCoupon.find();
        if (coupons) {
            res.status(200).json(coupons);
        }
        else {
            res.status(404).json({ message: 'Coupons not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//------------------------------END ---------------------------


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});