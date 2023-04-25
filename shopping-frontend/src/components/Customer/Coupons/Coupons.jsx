import { useState, useEffect } from 'react';
import axios from 'axios';

function Coupons() {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        async function fetchCoupons() {
            try {
                const response = await axios.get('/getallcoupons');
                setCoupons(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCoupons();
    }, []);

    return (
        <div>
            <h1>Coupons</h1>
            {coupons.map((coupon) => (
                <div key={coupon._id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">Coupon Code: {coupon.couponCode}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Discount Percentage: {coupon.discountPercentage}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Advertiser ID: {coupon.advertiserId}</h6>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Coupons;
