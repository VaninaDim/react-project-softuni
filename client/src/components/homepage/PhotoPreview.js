export const PhotoPreview = (props) => {
    return(
        <div className="photoPreview">
            <p>{props.name}</p>
            <img src={props.url} alt="" className="galleryImg"/>
            <p>Age: {props.age}</p>
            <p>Description: {props.description}</p>
        </div>
    )
}