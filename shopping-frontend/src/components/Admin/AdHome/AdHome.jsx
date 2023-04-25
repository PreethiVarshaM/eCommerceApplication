import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Table } from 'react-bootstrap'; // assuming Bootstrap is imported

function AdHome() {
    // State variables for data
    const [orders, setOrders] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);

    // Fetch data on component mount
    useEffect(() => {
        // Dummy order data
        const dummyOrders = [{ id: 1, customerName: 'John Doe', totalCost: 100 }, { id: 2, customerName: 'Jane Smith', totalCost: 200 }, { id: 3, customerName: 'Bob Johnson', totalCost: 300 }, { id: 4, customerName: 'Sarah Lee', totalCost: 400 }, { id: 5, customerName: 'Tom Jones', totalCost: 500 },];

        // Calculate total sales from dummy data
        const total = dummyOrders.reduce((sum, order) => sum + order.totalCost, 0);
        setTotalSales(total);

        // Calculate total earnings from dummy data
        const platformFee = dummyOrders.reduce((sum, order) => sum + order.totalCost * 0.1, 0);
        const earnings = total - platformFee;
        setTotalEarnings(earnings);

        // Set order data from dummy data
        setOrders(dummyOrders);
    }, []);

    // Format order data for table display
    const orderData = orders.map((order) => {
        const platformFee = order.totalCost * 0.1;
        return {
            id: order.id,
            customer: order.customerName,
            totalCost: order.totalCost,
            platformFee: platformFee,
            earnings: order.totalCost - platformFee,
        };
    });

    // Calculate total earnings from orders
    const totalOrderEarnings = orderData.reduce((total, order) => total + order.earnings, 0);


    return (
        <div className="admin-home-page">
            <h1>Admin Home Page</h1>
        </div>
    );
}
export default AdHome;
