import classes from './dogs.module.css'

import { PhotoPreview } from "./PhotoPreview"

export const GalleryPreview = (props) => {
    return(
        <div className={classes.galleryPreview}>
            {props.dogs.map((dog) => <div key={dog._id}><PhotoPreview name={dog.name.name} age={dog.name.age} url={dog.name.url} description={dog.name.description} /></div>)}
        </div>
    )
}