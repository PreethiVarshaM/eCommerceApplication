
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Home from './Customer/CustHome/Home';
import Login from './login/login.jsx';
import SignUp from './signup/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <>
          <Route exact path="/customer/:username/home" element={<Home />} />
        </>
        <>
          <Route exact path="/seller/:username/home" element={<Home />} />
        </>
        <>
          <Route exact path="/admin/:username/home" element={<Home />} />
        </>
      </Routes>
    </Router>
  );
}

export default App;
