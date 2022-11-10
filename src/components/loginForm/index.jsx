import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/userSlice';
import { PrimaryButton } from '../../styles/styledComponents/Buttons';
import { PrimaryInput } from '../../styles/styledComponents/Inputs';
import '../../styles/Login.css'

function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({
            name: username,
            password: password,
            LoggedIn: true
        }))
        navigate("/")
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="singleField">
                <label htmlFor="">Usuario: </label>

                <PrimaryInput
                    type="text"
                    placeholder='Username'
                    onChange={(event) => { setUsername(event.target.value) }}
                />
            </div>
            <div className="singleField">
                <label htmlFor="">Contraseña: </label>

                <PrimaryInput
                    type="password"
                    placeholder='Password'
                    onChange={(event) => { setPassword(event.target.value) }}
                />
            </div>
            <PrimaryButton type='submit'>Ingresar</PrimaryButton>
        </form>
    )
}

export default LoginForm