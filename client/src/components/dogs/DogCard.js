import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DogsContext } from '../../contexts/DogsContext'
import * as dogService from '../../services/dogService'
import classes from './dogs.module.css'

export const DogCard = (props) => {
    const navigate = useNavigate()
    const {deleteDogRecordHandler} = useContext(DogsContext)  
    const {user} = useContext(AuthContext)

    
    const deleteRecordHandler = (dogId) => {
        dogService.deleteDog(dogId)
        .then(newRecord => {
            deleteDogRecordHandler()
            navigate('/user-collection')
        })
        .catch((e) => {
            console.log(e)
            navigate('/404')
        })

    }
    return(
        <div className={classes.photoPreview} onClick={props.onClick}>
            <p className={classes.textTitle}>{props.name}</p>
            <div className={classes.imgContainer}><img src={props.url} alt="" className={classes.galleryImg}/></div>
            <p className={classes.textTitle}>Age: {props.age}</p>
            <p className={classes.textTitle}>This dog is currently: <i>{props.status}</i></p>
            <p className={classes.description}><span className={classes.textTitle}>Description:</span> {props.description}</p>              
            {user.accessToken && user._id == props.owner
                && 
                <>
                    <div className={classes.cardNavBtn}>
                        <button className={classes.navLink} onClick={()=>props.showPopUp(props.id)}>Edit</button>
                        <button className={classes.navLink} onClick={()=>deleteRecordHandler(props.id)}>Delete</button>
                    </div>
                </>
            }            
        </div>
    )
}