
import React from "react";
import { Link } from 'react-router-dom';


function AdminHeader() {


    return (
        <div className="adminNavbar" >
           
                <Link to='products'><h4>Products</h4></Link>
                <Link to='orders'><h4>Orders</h4></Link>
           
        </div >
    )
}

export default AdminHeader;