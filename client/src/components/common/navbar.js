// import { useState } from "react"
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const Navbar = ({showLogin, showRegister}) => {
    const {user} = useContext(AuthContext)

    console.log(user)
    return (
        <div className="container-fluid">                
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    {/* <button type="button" className="nav-link nav-link-1 active" aria-current="page" href="index.html">Gallery</button> */}
                    <Link className="nav-link nav-link-3" to='/' href="index.html">Gallery</Link>
                </li>
                <li className="nav-item">
                    {/* <button type="button" className="nav-link nav-link-2" onClick={showRegister}>Register</button> */}
                    <Link className="nav-link nav-link-3" to='/register' onClick={showRegister}>Register</Link>
                </li>
                <li className="nav-item">
                    {/* <button type="button" className="nav-link nav-link-3" onClick={showLogin}>Login</button> */}
                    <Link className="nav-link nav-link-3" to='/login' onClick={showLogin}>Login</Link>
                </li>
                <li className="nav-item">
                    {/* <button type="button" className="nav-link nav-link-4" href="contact.html">Contact</button> */}
                    <Link className="nav-link nav-link-3" to='/logout' onClick={()=>console.log('logging out...')}>Logout</Link>
                </li>
                <li className="nav-item">
                    {/* <button type="button" className="nav-link nav-link-4" href="contact.html">Contact</button> */}
                    <Link className="nav-link nav-link-3" to='/contact' href="contact.html">Contact</Link>
                </li>
            </ul>
        </div>
    )
}