import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { login } from '../../features/userSlice';
import { PrimaryButton } from '../../styles/styledComponents/Buttons';
import { PrimaryInput } from '../../styles/styledComponents/Inputs';
import '../../styles/Login.css'
import axios from 'axios';

function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.get(`https://api-alumnos-production.up.railway.app/${email}`)
        const user = res.data
        console.log(user)
        dispatch(login({
            ...user,
            password: password,
            LoggedIn: true
        }))
        navigate("/")
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="singleField">
                <label htmlFor="">Email: </label>

                <PrimaryInput
                    type="text"
                    placeholder='Username'
                    onChange={(event) => { setEmail(event.target.value) }}
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