import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import './ProductList.css';

const products = [
    {
        id: 1,
        name: 'Product 1',
        seller: 'Seller 1',
        warehouse: 'Warehouse 1',
        image: 'https://picsum.photos/200/300',
        cost: '$10',
        available: 5,
    },
    {
        id: 2,
        name: 'Product 2',
        seller: 'Seller 2',
        warehouse: 'Warehouse 2',
        image: 'https://picsum.photos/200/300',
        cost: '$20',
        available: 8,
    },
    {
        id: 3,
        name: 'Product 3',
        seller: 'Seller 3',
        warehouse: 'Warehouse 3',
        image: 'https://picsum.photos/200/300',
        cost: '$30',
        available: 10,
    },
];

function ProductCard({ product }) {
    return (
        <Card className="product-card">
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
        <Row>
            {products.map((product) => (
                <Col key={product.id} lg={4} md={6} sm={12}>
                    <ProductCard product={product} />
                </Col>
            ))}
        </Row>
    );
}

export default ProductList;
