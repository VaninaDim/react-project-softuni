
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import mockdata from './mockdata.json'

import * as dogService from './services/dogService'
import { AuthContext } from './contexts/AuthContext'

import { PageLoader } from './components/common/PageLoader'
import { Navbar } from './components/common/Navbar'
import { Login } from './components/users/Login'
import { Register } from './components/users/Register'
import { GalleryPreview } from './components/homepage/GalleryPreview'
import { Logout } from './components/users/Logout'

function App() {
    // THIS IS ONLY DUMMY LOADING SCREEN
    const [dummyLoader, setDummyLoader] = useState(true)
    useEffect(()=>{
        setTimeout(()=>{
            setDummyLoader(false)
        }, 500) 
    },[])
    //-----------------------

    const navigate = useNavigate()
    const [dogs, setDogs] = useState([])
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)    
    const [authenticate, setAuthenticate] = useState({})

    useEffect(() => {
        // dogService.getAll()
        //     .then(result => {
        //         setDogs(result);
        //     });

        setDogs(mockdata)
    }, []);

    const menuClickHandler = (submenu) => {
        if(submenu == 'login'){
            setShowLogin(true)
            console.log('login triggered');
        }else if (submenu == 'register'){
            setShowRegister(true)
            console.log('register triggered');
        }        
    }

    const closePopUpWindowHandler = () => {
        setShowLogin(false)
        setShowRegister(false)
        navigate('/')
    }

    const loginHandler = (authData) => {
        setAuthenticate(authData)
    }

    const logoutHandler = () => {
        setAuthenticate({})
    }


    return (
        <AuthContext.Provider value={{user: authenticate, loginHandler, logoutHandler}}>            
            <div className="App">
                {/* <!-- Page Loader --> */}
                {dummyLoader && <PageLoader />}

                <Navbar showLogin={()=>menuClickHandler('login')} showRegister={()=>menuClickHandler('register')} />


                
                <Routes>
                    <Route path="/" element={<GalleryPreview dogs={dogs}/>}/>
                    
                    <Route path="/login" element={<Login closeWindow={closePopUpWindowHandler}/>}/>
                    <Route path="/logout" element={<Logout closeWindow={closePopUpWindowHandler}/>}/>
                    <Route path="/register" element={<Register closeWindow={closePopUpWindowHandler}/>}/>                
                </Routes>
                
            </div>
        </AuthContext.Provider>
    );
}

export default App;
