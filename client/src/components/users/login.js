import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authentication from '../../services/authentication'
import { AuthContext } from '../../contexts/AuthContext'

export const Login = ({closeWindow}) => {
    const {loginHandler} = useContext(AuthContext)
    const navigate = useNavigate()

    const [loginErrorMessage, setLoginErrorMessage] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        const {
            email,
            password
        } = Object.fromEntries(new FormData(e.target))

        console.log(email, password, 'logged in')
        authentication.login(email, password)
        .then(authData => {
            console.log(authData)
            if (authData.hasOwnProperty('code') && authData.code == 403){
                console.log(authData, 'ERROR')
                setLoginErrorMessage(true)
            }else {
                loginHandler(authData)
                navigate('/')
            }
        })
        .catch((error) => {
            navigate('/')
        })
    }

    return (
        <div className="overlay">
            <div className="backdrop" onClick={closeWindow}></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>Login</h2>
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
                                <label htmlFor="email">Email</label>
                                <div className="input-wrapper">
                                    <input id="email" name="email" type="text"  />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">password</label>
                                <div className="input-wrapper">
                                    <input id="password" name="password" type="password"  />
                                </div>
                            </div>
                        </div>    
                        {loginErrorMessage && <div>Username or password is incorrect!</div>}
                        <div id="form-actions">
                            <button id="action-save" className="btn" type="submit" >Login</button>
                            <button id="action-cancel" className="btn" type="button" onClick={closeWindow}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}