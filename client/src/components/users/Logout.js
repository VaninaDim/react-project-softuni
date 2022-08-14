import { useEffect, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext"
import * as authentication from '../../services/authentication'

export const Logout = () => {
    const {user, logoutHandler} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        authentication.logout(user.accessToken)
        .then(() => {
            logoutHandler()
            navigate('/')
        })
        .catch(() => navigate('/'))
    })
    console.log(user)
}

