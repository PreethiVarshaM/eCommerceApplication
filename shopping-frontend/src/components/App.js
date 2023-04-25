
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Home from './Customer/CustHome/Home';
import Login from './login/login.jsx';
import SignUp from './signup/signup';
import AdHome from './Admin/AdHome/AdHome';
import SelHome from './Seller/SelHome/SelHome';
import AdvHome from './Advertiser/AdvHome/AdvHome';
import Cart from './Customer/Cart/Cart';
import Orders from './Customer/Orders/Orders';
import AddProductForm from "./Seller/AddProductForm/AddProductForm";
import SellDashboard from "./Seller/SellDashboard/SellDashboard";
import CreateCoupons from "./Advertiser/CreateCoupons/CreateCoupons";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <>
          <Route exact path="/customer/:username/home" element={<Home />} />
          <Route exact path="/customer/:username/cart" element={<Cart />} />
          <Route exact path="/customer/:username/orders" element={<Orders />} />
        </>
        <>
          <Route exact path="/seller/:username/home" element={<SelHome />} />
          <Route exact path="/seller/:username/AddProduct" element={<AddProductForm />} />
          <Route exact path="/seller/:username/dashboard" element={<SellDashboard />} />

        </>
        <>
          <Route exact path="/admin/:username/home" element={<AdHome />} />
        </>
        <>
          <Route exact path="/advertiser/:username/home" element={<AdvHome />} />
          <Route exact path="/advertiser/:username/createcoupons" element={<CreateCoupons />} />
        </>
      </Routes>
    </Router>
  );
}

export default App;
