import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: {
            dno: String,
            street: String,
            pinCode: String,
            city: String,
            State: String,
            Country: String,
        },
        required: true,
    },
    isSeller: {
        type: Boolean,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    isAdvertiser: {
        type: Boolean,
        required: true,
    },
    phone: {
        type: String,
    },
    timestamps: true,
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

export default User;