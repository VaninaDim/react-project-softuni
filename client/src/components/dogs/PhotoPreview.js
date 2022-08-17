import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { DogsContext } from '../../contexts/DogsContext'
import { Link } from 'react-router-dom';
import classes from './dogs.module.css'

export const PhotoPreview = (props) => {

    
    return(
        <div className={classes.photoPreview} onClick={props.onClick}>
            <p>{props.name}</p>
            <img src={props.url} alt="" className={classes.galleryImg}/>
            <p>Age: {props.age}</p>
            <p className={classes.description}>Description: {props.description}</p>
            {props.showEditButtons 
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