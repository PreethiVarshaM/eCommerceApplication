import mongoose from 'mongoose';

const discountCouponSchema = new mongoose.Schema({
    advertiserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advertiser',
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    advertiserAccount: {
        type: String,
        ref: 'AdvertiserAccount',
        required: true
    },
    couponCode: {
        type: String,
        required: true
    }
});

const DiscountCoupon = mongoose.model('DiscountCoupon', discountCouponSchema);
export default DiscountCoupon;
