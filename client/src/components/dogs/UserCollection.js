import { useContext, useState } from 'react';
import classes from './dogs.module.css'
import { AuthContext } from '../../contexts/AuthContext';
import { DogsContext } from '../../contexts/DogsContext'
import { PhotoPreview } from "../dogs/PhotoPreview"
import { DogCard } from './DogCard';

export const UserCollection = () => {
    const {user} = useContext(AuthContext)
    const {dogs} = useContext(DogsContext)
    const [dogToEdit, setDogToEdit] = useState(false)

    let showEditButtons

    if (user.accessToken){
        showEditButtons = true
    }else {
        showEditButtons = false
    }

    console.log(dogToEdit)
    const showPopUp = (dogId) => {
        for(let i=0; i<dogs.length; i++){
            if (dogs[i]._id == dogId){
                setDogToEdit(dogs[i])
            }            
        }
    }


    return (
        <div className={classes.galleryPreview}>
            {dogs.map((dog) => dog._ownerId === user._id && <div key={dog._id}><PhotoPreview id={dog._id} name={dog.name.name} age={dog.name.age} url={dog.name.url} description={dog.name.description} showEditButtons={showEditButtons} showPopUp={showPopUp}/></div> )}
            {dogToEdit && <DogCard dogId={dogToEdit.id} /> }
        </div>
    )
}