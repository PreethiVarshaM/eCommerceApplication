import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Headroom from 'react-headroom';
function Home() {
    return (
        <Container>
            <Headroom>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </Headroom>
            <Row>
                <Col>
                    <h1>Welcome to My Ecommerce Store</h1>
                    <p>Shop our latest products and find great deals!</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img src="/path/to/image" alt="Product" />
                </Col>
                <Col>
                    <h2>Featured Product</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non libero eget nunc blandit tincidunt. Curabitur accumsan dapibus velit, ut porttitor nunc posuere sed.</p>
                    <button>Add to Cart</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Latest Products</h2>
                    <p>Check out our newest arrivals!</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img src="/path/to/image" alt="Product" />
                    <h3>Product Name</h3>
                    <p>$99.99</p>
                    <button>Add to Cart</button>
                </Col>
                <Col>
                    <img src="/path/to/image" alt="Product" />
                    <h3>Product Name</h3>
                    <p>$99.99</p>
                    <button>Add to Cart</button>
                </Col>
                <Col>
                    <img src="/path/to/image" alt="Product" />
                    <h3>Product Name</h3>
                    <p>$99.99</p>
                    <button>Add to Cart</button>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
