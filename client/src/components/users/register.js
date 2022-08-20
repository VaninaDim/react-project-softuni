import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authentication from '../../services/authentication'
import { AuthContext } from '../../contexts/AuthContext'
import classes from './users.module.css'


export const Register = ({closeWindow}) => {
    const navigate = useNavigate()
    const {loginHandler} = useContext(AuthContext)
    const [validPass, setValidPass] = useState()

    console.log(validPass)
    const onSubmit = (e) => {
        e.preventDefault()
        const {
            email,
            password,
            repeatPass,
        } = Object.fromEntries(new FormData(e.target))

        if (password != repeatPass){
            setValidPass(false)
            return
        }

        authentication.register(email, password)
        .then(authData => {
            loginHandler(authData)
            navigate('/')
        })
        .catch(() => {
            navigate('/')
        })
    }

    return (
        <div className={classes.overlay}>
            <div className="backdrop" onClick={closeWindow}></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>Registration</h2>
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
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                <input id="password" name="password" type="password"  />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="repeatPass">Confirm password</label>
                                <div className="input-wrapper">
                                <input id="repeatPass" name="repeatPass" type="password"  />
                                </div>
                            </div>
                        </div>
                        {validPass === false && <div className={classes.errorText}>Password not confirmed! Please try again.</div>}
                        <div id="form-actions">
                            <button id="action-save" className="btn" type="submit" >Register</button>
                            <button id="action-cancel" className="btn" type="button" onClick={closeWindow}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}