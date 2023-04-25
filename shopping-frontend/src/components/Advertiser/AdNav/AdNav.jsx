import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function AdvertiserNavbar() {
    const location = useLocation();
    const username = location.pathname.split('/')[2];
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/advertiser/dashboard">Advertiser Dashboard</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/advertiser/" + username + "/createcoupons"}>Create New Coupon</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default AdvertiserNavbar;
