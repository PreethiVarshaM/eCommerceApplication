import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SellDashboard() {
    const [transactions, setTransactions] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const location = useLocation();
    const sellerId = location.pathname.split('/')[2];

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('/getsellertransaction', { sellerID: sellerId });
                let sum = 0
                setTransactions(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    sum += response.data[i].amount;
                    //setTotalSales(totalSales + response.data[i].amount);
                }
                setTotalSales(sum);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Seller Transactions</h1>
            <h2>Total Sales: {totalSales}</h2>
            {transactions.map((transaction) => (
                <div key={transaction._id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">orderId:  {transaction.orderId}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">productId: {transaction.productId}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">CustomerId: {transaction.customerId}</h6>
                        <p className="card-text">Amount: {transaction.amount}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SellDashboard;
