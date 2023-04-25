import react from 'react';
import { useLocation } from 'react-router-dom';
import AddProductForm from '../AddProductForm/AddProductForm';
import SellerNavbar from '../SellerNav/SellerNav';
import './SelHome.css';

function SelHome() {
    const location = useLocation();
    const userid = location.pathname.split('/')[2];
    return (
        <div className="seller-home-page">
            <SellerNavbar userid={userid} />
            <p>Seller Page</p>
        </div>
    );
}
export default SelHome;