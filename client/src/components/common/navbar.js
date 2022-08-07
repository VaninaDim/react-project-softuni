// import { useState } from "react"

export const Navbar = ({showLogin, showRegister}) => {
    
    return (
        <div className="container-fluid">                
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <button type="button" className="nav-link nav-link-1 active" aria-current="page" href="index.html">Gallery</button>
                </li>
                <li className="nav-item">
                    <button type="button" className="nav-link nav-link-2" onClick={showRegister}>Register</button>
                </li>
                <li className="nav-item">
                    <button type="button" className="nav-link nav-link-3" onClick={showLogin}>Login</button>
                </li>
                <li className="nav-item">
                    <button type="button" className="nav-link nav-link-4" href="contact.html">Contact</button>
                </li>
            </ul>
        </div>
    )
}