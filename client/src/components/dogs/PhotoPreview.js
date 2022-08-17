import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import classes from './dogs.module.css'

export const PhotoPreview = (props) => {
    const {user} = useContext(AuthContext)
    
    return(
        <div className={classes.photoPreview} onClick={props.onClick}>
            <p>{props.name}</p>
            <img src={props.url} alt="" className={classes.galleryImg}/>
            <p>Age: {props.age}</p>
            <p className={classes.description}>Description: {props.description}</p>
            {user.accessToken && user._id !== props.owner
                && 
                <>
                    <div className={classes.cardNavBtn}>
                        <button className={classes.navLink} onClick={()=>props.changeOwner(props.id, user._id)}>ADOPT</button>
                    </div>
                </>
            }   
            {user.accessToken && user._id == props.owner
                && 
                <>
                    <div className={classes.cardNavBtn}>
                        <button className={classes.navLink} onClick={()=>props.showPopUp(props.id)}>Edit</button>
                        <Link className={classes.navLink} to='/'>Delete</Link>
                    </div>
                </>
            }            
        </div>
    )
}