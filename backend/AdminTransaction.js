import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
});

const AdminTransaction = mongoose.model('AdminTransaction', transactionSchema);
export default AdminTransaction;
