import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import './ProductList.css';


function ProductCard({ product, userid }) {

    const [pid, setpid] = useState(product);
    const [uid, setuid] = useState(userid);

    const handleAddToCart = async (productId) => {
        try {
            const customerId = uid.userid;
            const response = await axios.post('http://localhost:5000/addtocart', { pid, customerId, quantity: 1 });
            console.log(await response.data);
            alert(`Added ${product.name} to cart!`);

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Card className="product-card">
            <Card.Img variant="top" src={'https://picsum.photos/200'} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    <p>Product ID: {product.id}</p>
                    <p>Seller: {product.sellerId}</p>
                    <p>Warehouse: {product.warehouse}</p>
                    <p>Cost: {product.cost}</p>
                    <p>Available: {product.quantity}</p>
                </Card.Text>
                <Button variant="primary" onClick={handleAddToCart}>Add to cart</Button>

            </Card.Body>
        </Card >
    );

}

function ProductList(userid) {

    const [products, setProducts] = useState([]);
    //get products from backend
    React.useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getallproducts');

                setProducts(response.data.products);
            } catch (error) {
                console.error(error);
            }
        };
        getProducts();
    }, []);

    return (
        <Row>
            {products.map((product) => (
                <Col key={product.id} lg={4} md={6} sm={12}>
                    <ProductCard product={product} userid={userid} />
                </Col>
            ))}
        </Row>
    );
}

export default ProductList;
