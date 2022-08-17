// import { useState } from "react"
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const Navbar = () => {
    const {user} = useContext(AuthContext)

    return (
        <div className="container-fluid">                
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                       
                <li className="nav-item">
                    <Link className="nav-link" to='/' >Gallery</Link>
                </li>
                {user.accessToken ?
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to='/user-collection'>My dogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/create-record'>Create new entry</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/logout' >Logout</Link>
                        </li>
                    </>
                    :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to='/register'>Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/login'>Login</Link>
                        </li>
                    </>            
                }      
            </ul>
        </div>
    )
}