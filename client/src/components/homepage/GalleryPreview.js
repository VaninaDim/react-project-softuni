import { PhotoPreview } from "./PhotoPreview"

export const GalleryPreview = (props) => {
    console.log(props.dogs, 'this should be the dogs')
    return(
        <div className="galleryPreview">
            {props.dogs.map((dog) => <div key={dog.id}><PhotoPreview name={dog.name} age={dog.age} url={dog.url} description={dog.description}/></div>)}
        </div>
    )
}