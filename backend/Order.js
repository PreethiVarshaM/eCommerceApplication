import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            default: 0
        }
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    payment: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        default: '0'
    },
    bank: {
        type: String,
        default: 'Bank1'
    },



});

export default mongoose.model('Order', OrderSchema);
