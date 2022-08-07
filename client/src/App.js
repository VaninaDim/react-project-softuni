
import { useState, useEffect } from 'react'
import './App.css'

import { PageLoader } from './components/common/pageLoader'
import { Navbar } from './components/common/navbar'
import { Login } from './components/users/login'
import { Register } from './components/users/register'

function App() {
    // THIS IS ONLY DUMMY LOADING SCREEN
    const [dummyLoader, setDummyLoader] = useState(true)
    useEffect(()=>{
        setTimeout(()=>{
            setDummyLoader(false)
        }, 500) 
    },[])
    //-----------------------
//test new branch
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const menuClickHandler = (submenu) => {
        console.log('handler new branch')
        if(submenu == 'login'){
            setShowLogin(true)
            console.log('login triggered');
        }else if (submenu == 'register'){
            setShowRegister(true)
            console.log('register triggered');
        }        
    }

    return (
        <div className="App">
            {/* <!-- Page Loader --> */}
            {dummyLoader && <PageLoader />}

            <Navbar showLogin={()=>menuClickHandler('login')} showRegister={()=>menuClickHandler('register')}/>

            {showLogin && <Login />}
            {showRegister && <Register />}

            
        </div>
    );
}

export default App;
