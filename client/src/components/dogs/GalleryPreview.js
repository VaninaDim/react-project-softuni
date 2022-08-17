import classes from './dogs.module.css'
import * as dogService from '../../services/dogService'

import { PhotoPreview } from "./PhotoPreview"

export const GalleryPreview = (props) => {

    const adoptDog = (dogId,ownerId) => {
        console.log(dogId, 'ADOPTED BY', ownerId, )
             //rethink this logic
    }

    return(
        <div className={classes.galleryPreview}>
            {props.dogs.map((dog) => <div key={dog._id}><PhotoPreview id={dog._id} name={dog.name.name} age={dog.name.age} url={dog.name.url} description={dog.name.description} owner={dog._ownerId} changeOwner={adoptDog} /></div>)}
        </div>
    )
}