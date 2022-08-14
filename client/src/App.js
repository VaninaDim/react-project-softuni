
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import * as dogService from './services/dogService'

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
    const [dogs, setDogs] = useState([])
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)    

    useEffect(() => {
        // dogService.getAll()
        //     .then(result => {
        //         setDogs(result);
        //     });

        setDogs([
            {
                id: 'dog1',
                name: 'Fluffy',
                url: 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e',
                age: 1,
                description: 'this is just a little pug'
            },
            {
                id: 'dog2',
                name: 'Happy',
                url: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2022-08/220805-border-collie-play-mn-1100-82d2f1.jpg',
                age: 4,
                description: 'this dog smiles practically 24/7'
            }
        ])
    }, []);

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

    const closePopUpWindowHandler = () => {
        setShowLogin(false)
        setShowRegister(false)
    }

    return (
        <div className="App">
            {/* <!-- Page Loader --> */}
            {dummyLoader && <PageLoader />}

            <Navbar showLogin={()=>menuClickHandler('login')} showRegister={()=>menuClickHandler('register')} />

            {showLogin && <Login closeWindow={closePopUpWindowHandler}/>}
            {showRegister && <Register closeWindow={closePopUpWindowHandler}/>}

            
            <Routes>
                {<Route path="/" element={<GalleryPreview dogs={dogs}/>}/>} 

            </Routes>
            
        </div>
    );
}

export default App;
