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
import { ErrorPage } from './components/common/404'
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
    const [authenticate, setAuthenticate] = useLocalStorage('authUser', {})

    useEffect(() => {
        getAll()
            .then(result => {
                setDogs(result);
            })
            .catch((e) => {
                console.log(e, 'probably need to clear cache')
            });

    }, []);

    const closePopUpWindowHandler = () => {
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
    }

    const updateDogRecordHandler = (dogRecord) => {
        setDogs(state => state.map(x => x._id === dogRecord._id ? dogRecord : x))
    }

    
    const deleteDogRecordHandler = () => {
        getAll()
            .then(result => {
                console.log(result)
                setDogs(result);
            })
            .catch((e) => {
                console.log(e)
            });
    }

    return (
        <AuthContext.Provider value={{user: authenticate, loginHandler, logoutHandler}}>            
            <div className="App">
                {/* <!-- Page Loader --> */}
                {dummyLoader && <PageLoader />}

                <Navbar />
                <h3 style={{marginLeft: '20px'}}>Welcome, {authenticate.accessToken ? authenticate.email : 'Guest'}</h3>
                <DogsContext.Provider value={{dogs, createDogRecordHandler, updateDogRecordHandler, deleteDogRecordHandler}}>
                    <Routes>
                        <Route path="/" element={<GalleryPreview dogs={dogs}/>}/>
                        <Route path="/create-record" element={<CreateRecord closeWindow={closePopUpWindowHandler}/>}/>
                        <Route path="/user-collection" element={<UserCollection />}/>
                        <Route path="/login" element={<Login closeWindow={closePopUpWindowHandler}/>}/>
                        <Route path="/logout" element={<Logout closeWindow={closePopUpWindowHandler}/>}/>
                        <Route path="/register" element={<Register closeWindow={closePopUpWindowHandler}/>}/> 
                        <Route path="/404" element={<ErrorPage />}/>                
                    </Routes>
                </DogsContext.Provider>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
