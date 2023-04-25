import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import CustNav from '../Nav/CustNav';
import ProductList from '../ProductList/ProductList';
import './Home.css';
import Coupons from '../Coupons/Coupons';

function Home() {
    const location = useLocation();
    const userid = location.pathname.split('/')[2];
    //console.log(userid);
    return (
        <div>
            <CustNav userid={userid} />
            <Coupons />
            <h2>Product List</h2>
            <ProductList userid={userid} />
        </div>
    );
}

export default Home;
