import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
// import mockdata from './mockdata.json'

import * as dogService from './services/dogService'
import { AuthContext } from './contexts/AuthContext'
import { DogsContext } from './contexts/DogsContext'

import { PageLoader } from './components/common/PageLoader'
import { Navbar } from './components/common/Navbar'
import { Login } from './components/users/Login'
import { Register } from './components/users/Register'
import { GalleryPreview } from './components/dogs/GalleryPreview'
import { Logout } from './components/users/Logout'
import { CreateRecord } from './components/dogs/CreateRecord'
import { UserCollection } from './components/dogs/UserCollection'
import { DogCard } from './components/dogs/DogCard'
import useLocalStorage from './hooks/useLocalStorage'

import { getAll } from './services/dogService';


function App() {

    // async {
    //     const data = collection(db, 'dogs')
    //     const dogSnapshot =  getDocs(data)
    //     const dogList = dogSnapshot.docs.map(doc => doc.data())
    //     setDummyData(dogList) 

    // }, []);

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
    // const [x, setX] = useState([])
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)    
    const [authenticate, setAuthenticate] = useLocalStorage('authUser', {})

    // useEffect(() => {
    //     // dogService.getAll()
    //     //     .then(result => {
    //     //         setDogs(result);
    //     //     });

    //     setDogs(mockdata)
    // }, []);

    useEffect(() => {
        getAll()
            .then(result => {
                console.log(result)
                setDogs(result);
            });

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

    const createDogRecordHandler = (dogRecord) => {
        setDogs(state => [
            ...state,
            dogRecord
        ])
        navigate('/')
    }


    return (
        <AuthContext.Provider value={{user: authenticate, loginHandler, logoutHandler}}>            
            <div className="App">
                {/* <!-- Page Loader --> */}
                {dummyLoader && <PageLoader />}

                <Navbar showLogin={()=>menuClickHandler('login')} showRegister={()=>menuClickHandler('register')} />

                <DogsContext.Provider value={{dogs, createDogRecordHandler}}>
                    <Routes>
                        <Route path="/" element={<GalleryPreview dogs={dogs}/>}/>
                        <Route path="/create-record" element={<CreateRecord closeWindow={closePopUpWindowHandler}/>}/>
                        <Route path="/user-collection" element={<UserCollection />}/>
                        <Route path="/dog-card" element={<DogCard closeWindow={closePopUpWindowHandler}/>}/>
                        <Route path="/login" element={<Login closeWindow={closePopUpWindowHandler}/>}/>
                        <Route path="/logout" element={<Logout closeWindow={closePopUpWindowHandler}/>}/>
                        <Route path="/register" element={<Register closeWindow={closePopUpWindowHandler}/>}/>                
                    </Routes>
                </DogsContext.Provider>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
