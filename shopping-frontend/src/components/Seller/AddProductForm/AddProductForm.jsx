import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function AddProductForm() {
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const [productCost, setProductCost] = useState(0);
    const [productDiscount, setProductDiscount] = useState(0);
    const [advertiserId, setAdvertiserId] = useState('');
    const location = useLocation();
    const userid = location.pathname.split('/')[2];
    //const [sellerId, setSellerId] = useState(userid);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/addProduct', {
                name: productName,
                quantity: productQuantity,
                cost: productCost,
                discount: productDiscount,
                advertiserId: advertiserId,
                sellerId: userid,
            });
            console.log(response.data);
            alert('Product added successfully!');
        } catch (error) {
            console.error(error);
            alert('Error adding product!');
        }

        setProductName('');
        setProductQuantity(0);
        setProductCost(0);
        setProductDiscount(0);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="productQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter product quantity"
                    value={productQuantity}
                    onChange={(event) => setProductQuantity(event.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="productCost">
                <Form.Label>Cost</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter product cost"
                    value={productCost}
                    onChange={(event) => setProductCost(event.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="productDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter product discount"
                    value={productDiscount}
                    onChange={(event) => setProductDiscount(event.target.value)}
                />
            </Form.Group>


            <Button variant="primary" type="submit">
                Add Product
            </Button>
        </Form>
    );
}

export default AddProductForm;
