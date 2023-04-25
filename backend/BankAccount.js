import mongoose from 'mongoose';

const bankAccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bankId: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    },
    accountBalance: {
        type: Number,
        default: 0
    }
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

export default BankAccount;
