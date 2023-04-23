import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustNav from '../Nav/CustNav';
import ProductList from '../ProductList/ProductList';
import './Home.css';

function Home() {
    return (
        <div>
            <CustNav />
            <ProductList />
        </div>
    );
}

export default Home;
