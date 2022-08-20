import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import * as authentication from '../../services/authentication'
import { DogsContext } from '../../contexts/DogsContext'
import * as dogService from '../../services/dogService'



export const CreateRecord = ({closeWindow}) => {
    const navigate = useNavigate()
    const {createDogRecordHandler} = useContext(DogsContext)
    const defaultStatus = 'In shelter'

    const onSubmit = (e) => {
        e.preventDefault()
        const dogRecord = Object.fromEntries(new FormData(e.target))
        console.log(dogRecord)

        dogService.createDog(dogRecord, defaultStatus)
        .then(newRecord => {
            console.log(newRecord, 'created new dog record')
            createDogRecordHandler(newRecord)
            navigate('/user-collection')
        })
        .catch(() => {
            navigate('/')
        })
    }

    return (
        <div className="overlay">
            <div className="backdrop" onClick={closeWindow}></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>New record</h2>
                        <button className="btn close" onClick={closeWindow}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path fill="currentColor"
                                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                </path>
                            </svg>
                        </button>
                    </header>
                    <form onSubmit={onSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Dog name</label>
                                <div className="input-wrapper">
                                <input id="name" name="name" type="text"  />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <div className="input-wrapper">
                                <input id="age" name="age" type="number"  />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="url">Image URL</label>
                                <div className="input-wrapper">
                                <input id="url" name="url" type="text"  />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <div className="textarea-wrapper">
                                <textarea id="description" name="description" rows="5" cols="40"></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div id="form-actions">
                            <button id="action-save" className="btn" type="submit" >Create</button>
                            <button id="action-cancel" className="btn" type="button" onClick={closeWindow}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}