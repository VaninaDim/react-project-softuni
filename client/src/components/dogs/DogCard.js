import { useContext } from 'react';
import { DogsContext } from '../../contexts/DogsContext'

export const DogCard = (props) => {    
    const {dogs} = useContext(DogsContext)

    // console.log(dogs)
    return(
        <div>
            <p>YOUR DOG HERE! {props.dogId}</p>
        </div>
    )
}