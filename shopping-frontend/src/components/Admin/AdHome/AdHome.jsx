import React, { useState, useEffect } from 'react';
import AdminTransactions from '../AdminTransactions/AdminTransactions';

function AdHome() {
    return (
        <div className="admin-home-page">
            <h1>Admin Home Page</h1>
            <AdminTransactions />
        </div>
    );
}
export default AdHome;
