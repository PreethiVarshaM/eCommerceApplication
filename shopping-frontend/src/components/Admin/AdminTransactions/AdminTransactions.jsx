import axios from 'axios';
import { useState, useEffect } from 'react';

function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('/getadmintransaction');
                setTransactions(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    setTotalSales(totalSales + response.data[i].amount);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Admin Transactions</h1>
            <h2>Total Sales: {totalSales}</h2>
            {transactions.map((transaction) => (
                <div key={transaction._id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">orderId:  {transaction.orderId}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">CustomerId: {transaction.customerId}</h6>
                        <p className="card-text">Amount: {transaction.amount}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminTransactions;
