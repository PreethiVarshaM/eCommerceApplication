import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function CreateCoupons() {
    const [couponCode, setCouponCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const location = useLocation();
    const username = location.pathname.split('/')[2];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/createCoupon', {
                advertiserId: username,
                couponCode,
                discountPercent,
            });
            console.log(response.data);
            // do something with the response, e.g. show a success message
        } catch (error) {
            console.error(error);
            // handle error, e.g. show an error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create New Coupon</h1>
            <div>
                <label>Coupon Code:</label>
                <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />
            </div>
            <div>
                <label>Discount Percentage:</label>
                <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>Create Coupon</button>
        </form>
    );
}

export default CreateCoupons;
