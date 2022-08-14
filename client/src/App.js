
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


    return (
        <AuthContext.Provider value={{user: authenticate, loginHandler}}>            
            <div className="App">
                {/* <!-- Page Loader --> */}
                {dummyLoader && <PageLoader />}

                <Navbar showLogin={()=>menuClickHandler('login')} showRegister={()=>menuClickHandler('register')} />

                {/* {showLogin && <Login closeWindow={closePopUpWindowHandler}/>} */}
                {showRegister && <Register closeWindow={closePopUpWindowHandler}/>}

                
                <Routes>
                    <Route path="/" element={<GalleryPreview dogs={dogs}/>}/>
                    {showLogin && <Route path="/login" element={<Login closeWindow={closePopUpWindowHandler}/>}/>}
                    <Route path="/register" element={<Register closeWindow={closePopUpWindowHandler}/>}/>                
                </Routes>
                
            </div>
        </AuthContext.Provider>
    );
}

export default App;
