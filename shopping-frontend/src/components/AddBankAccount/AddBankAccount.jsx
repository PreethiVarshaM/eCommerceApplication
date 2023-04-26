import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function AddBankAccount() {
    const [accountId, setAccountId] = useState('');
    const [bankId, setBankId] = useState('');
    const [bankName, setBankName] = useState('');
    const location = useLocation();
    const userId = location.pathname.split('/')[1];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accountBalance = Math.floor(Math.random() * (1000000 - 10000 + 1) + 10000);
        const data = { userId, accountId, bankId, bankName, accountBalance };
        try {
            const response = await axios.post('/addbankaccount', data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2> Add New Bank Account</h2>
            <Form.Group controlId="formAccountId">
                <Form.Label>Account ID</Form.Label>
                <Form.Control type="text" placeholder="Enter account ID" value={accountId} onChange={(e) => setAccountId(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBankId">
                <Form.Label>Bank ID</Form.Label>
                <Form.Control type="text" placeholder="Enter bank ID" value={bankId} onChange={(e) => setBankId(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBankName">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control type="text" placeholder="Enter bank name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">Add Bank Account</Button>
        </Form>
    );
}
export default AddBankAccount;