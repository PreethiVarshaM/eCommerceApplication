import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [bankAccountNumber, setBankAccountNumber] = useState('1');
    const [bankName, setBankName] = useState('Bank1');
    const [coupon, setCoupon] = useState('---');

    const location = useLocation();
    useEffect(() => {
        async function fetchOrders() {
            const customerId = location.pathname.split('/')[2];
            const response = await axios.post('http://localhost:5000/getallorders', { customerId: customerId });
            setOrders(response.data);
        }
        fetchOrders();
    }, []);

    const handlePayment = async (orderId, bankAccountNumber, bankName) => {
        try {
            const customerId = location.pathname.split('/')[2];
            const response = await axios.post(`http://localhost:5000/updateorderpayment`, {
                customerId,
                orderId,
                bankAccountNumber,
                bankName
            });
            console.log(response.data)
            setOrders(prevOrders => {
                return prevOrders.map(order => {
                    if (order._id === response.data._id) {
                        return response.data;
                    }
                    return order;
                });
            });
            // notify success
        } catch (error) {
            console.error(error);
            // notify error
        }
    };

    return (
        <div>
            <h1>Orders</h1>
            {orders.map(order => (
                <div key={order._id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{`Order #${order._id}`}</h5>
                        <p className="card-text">{`Total: $${order.total}`}</p>
                        <p className="card-text">{`Status: ${order.status}`}</p>
                        {order.payment ? (
                            <p className="card-text">Paid</p>
                        ) : (
                            <div>
                                <p >Coupon Code</p>
                                <input type="text" placeholder="coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                <p >Bank Account Number</p>
                                <input type="text" placeholder="Bank account number" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} />
                                <p >Bank Name</p>
                                <input type="text" placeholder="Bank name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                                <button className="btn btn-primary" onClick={() => handlePayment(order._id, bankAccountNumber, bankName)}>
                                    Pay
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Orders;
