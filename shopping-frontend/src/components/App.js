
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

        </>
        <>
          <Route exact path="/admin/:username/home" element={<AdHome />} />
        </>
        <>
          <Route exact path="/advertiser/:username/home" element={<AdvHome />} />
        </>
      </Routes>
    </Router>
  );
}

export default App;
