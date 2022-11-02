import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/userSlice';
import './Login.css'

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
                <label htmlFor="">Username: </label>

                <input
                    type="text"
                    placeholder='Username'
                    onChange={(event) => { setUsername(event.target.value) }}
                />
            </div>
            <div className="singleField">
                <label htmlFor="">Password: </label>

                <input
                    type="password"
                    placeholder='Password'
                    onChange={(event) => { setPassword(event.target.value) }}
                />
            </div>
            <button type='submit'>Login </button>
        </form>
    )
}

export default LoginForm