import { useContext, useState } from 'react'
import classes from './dogs.module.css'
import { DogsContext } from '../../contexts/DogsContext'

import { DogCard } from "./DogCard"
import { EditDog } from './EditDog';

export const GalleryPreview = (props) => {
    const {dogs} = useContext(DogsContext)
    const [dogToEdit, setDogToEdit] = useState(false)

    const showPopUp = (dogId) => {
        for(let i=0; i<dogs.length; i++){
            if (dogs[i]._id == dogId){
                setDogToEdit(dogs[i])
            }            
        }        
    }
    
    const closePopUpWindowHandler = () => {
        setDogToEdit(false)
    }

    return(
        <div className={classes.galleryPreview}>
            {props.dogs.map((dog) => 
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
            )}
            {dogToEdit 
                && 
                <EditDog 
                    dogId={dogToEdit.id} 
                    dog={dogToEdit} 
                    closeWindow={closePopUpWindowHandler}
                /> 
            }
        </div>
    )
}