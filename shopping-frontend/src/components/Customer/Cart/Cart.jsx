import { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const navigate = useNavigate();

    const location = useLocation();
    const userId = location.pathname.split('/')[2];

    useEffect(() => {
        const fetchCartItems = async () => {
            const response = await axios.post(`http://localhost:5000/getcart`, { customerId: userId });
            setCartItems(response.data.items);

            //console.log(response.data.items)

            const fetchProduct = async () => {

                const arr = []
                let sum = 0
                for (let i = 0; i < cartItems.length; i++) {
                    //console.log(cartItems[i].productId)
                    const response = await axios.post('http://localhost:5000/getproduct', { productId: cartItems[i].productId });
                    sum += response.data.cost;
                    arr.push(response.data)
                    //console.log(response.data)
                }
                setProduct(arr);
                setTotalCost(sum)
                //console.log(product)
            }
            fetchProduct();

        };

        fetchCartItems();


    }, [userId]);

    const handleQuantityChange = async (itemIndex, newQuantity) => {
        const newItems = [...cartItems];
        newItems[itemIndex].quantity = newQuantity;

        const response = await axios.put('http://localhost:5000/updatecart', {
            customerId: userId,
            items: newItems,
        });
        setCartItems(response.data.items);
    };

    const placeOrder = async () => {
        try {
            const response = await axios.post('http://localhost:5000/placeorder', { cartItems, userId, totalCost });
            console.log('place order', response.data);
            toast.success('Order placed successfully!');
            alert('Order placed successfully!');
            const url = "/customer/" + userId + "/orders"
            navigate(url);
        } catch (error) {
            console.error(error);
            toast.error('Failed to place order. Please try again.');
        }
    }




    return (
        <div>
            <h1>Cart</h1>
            <h2>TotalCost: {totalCost}</h2>
            {

                product.map((item, index) => (
                    <Card key={item._id} className="product-card">
                        <Card.Img variant="top" src={'https://picsum.photos/200'} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                                <p>Product ID: {item._id}</p>
                                <p>Seller: {item.sellerId}</p>
                                <p>Warehouse: {item.warehouse}</p>
                                <p>Cost: {item.cost}</p>
                                <p>Available: {item.quantity}</p>
                                <Form.Group controlId={`quantity-${cartItems[index].quantity}`}>
                                    <Form.Label>Quantity:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={cartItems[index].quantity}
                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                    />
                                </Form.Group>
                            </Card.Text>
                            <Button variant="danger" >Remove</Button>
                        </Card.Body>
                    </Card>
                ))}
            <Button variant="success" onClick={placeOrder}>Checkout</Button>
        </div>
    );
}

export default Cart;
