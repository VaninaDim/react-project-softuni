// import { useState } from "react"
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const Navbar = ({showLogin, showRegister, showCreateRecord}) => {
    const {user} = useContext(AuthContext)

    return (
        <div className="container-fluid">                
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                {user.accessToken ?
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to='/create-record' onClick={showCreateRecord}>Create new entry</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/logout' >Logout</Link>
                        </li>
                    </>
                    :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to='/register' onClick={showRegister}>Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/login' onClick={showLogin}>Login</Link>
                        </li>
                    </>            
                }                
                <li className="nav-item">
                    <Link className="nav-link" to='/' href="index.html">Gallery</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/contact' href="contact.html">Contact</Link>
                </li>
            </ul>
        </div>
    )
}