import { useContext, useState } from 'react';
import classes from './dogs.module.css'
import { AuthContext } from '../../contexts/AuthContext';
import { DogsContext } from '../../contexts/DogsContext'
import { DogCard } from "./DogCard"
import { EditDog } from './EditDog';

export const UserCollection = () => {
    const {user} = useContext(AuthContext)
    const {dogs} = useContext(DogsContext)
    const [dogToEdit, setDogToEdit] = useState(false)
    let hasCollection = false

    const closePopUpWindowHandler = () => {
        setDogToEdit(false)
    }

    const showPopUp = (dogId) => {
        for(let i=0; i<dogs.length; i++){
            if (dogs[i]._id == dogId){
                setDogToEdit(dogs[i])
            }            
        }        
    }

    dogs.map((dog) => {
        if(dog._ownerId === user._id) {
            hasCollection = true
        }    
    })


    return (
        <>
            <h2 className={classes.pageTitle}>My Collection</h2>
            <div className={classes.galleryPreview}>
                {dogToEdit 
                    && 
                    <EditDog 
                        dogId={dogToEdit.id} 
                        dog={dogToEdit} 
                        closeWindow={closePopUpWindowHandler}
                    /> 
                }
                {hasCollection 
                    ? 
                    dogs.map((dog) => 
                        dog._ownerId === user._id 
                            && 
                            <div key={dog._id}>
                                <DogCard 
                                    id={dog._id} 
                                    name={dog.name.name} 
                                    age={dog.name.age} 
                                    url={dog.name.url} 
                                    description={dog.name.description} 
                                    owner={dog._ownerId} 
                                    status={dog.name.status}
                                    showPopUp={showPopUp}
                                />
                            </div> 
                        ) 
                    : 
                    <div>This collection is empty. Start it by creating a new entry.</div>
                }
                
            </div>
        </>
    )
}