import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductList.css'

const products = [
    {
        id: 1,
        name: 'Product 1',
        seller: 'Seller 1',
        warehouse: 'Warehouse 1',
        image: 'https://via.placeholder.com/150',
        cost: '$10',
        available: 5
    },
    {
        id: 2,
        name: 'Product 2',
        seller: 'Seller 2',
        warehouse: 'Warehouse 2',
        image: 'https://via.placeholder.com/150',
        cost: '$20',
        available: 8
    },
    {
        id: 3,
        name: 'Product 3',
        seller: 'Seller 3',
        warehouse: 'Warehouse 3',
        image: 'https://via.placeholder.com/150',
        cost: '$30',
        available: 10
    }
];

function ProductCard({ product }) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    <p>Product ID: {product.id}</p>
                    <p>Seller: {product.seller}</p>
                    <p>Warehouse: {product.warehouse}</p>
                    <p>Cost: {product.cost}</p>
                    <p>Available: {product.available}</p>
                </Card.Text>
                <Button variant="primary">Add to cart</Button>
            </Card.Body>
        </Card>
    );
}

function ProductList() {
    return (
        <div>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;
