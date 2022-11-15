import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/userSlice';
import { PrimaryButton } from '../../styles/styledComponents/Buttons';
import { PrimaryInput } from '../../styles/styledComponents/Inputs';
import '../../styles/Login.css'
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.get(`https://quark.academy/webservice/rest/server.php?wstoken=11e282e69970c31ed54f38925921b88f&wsfunction=core_user_get_users&criteria[0][key]=username&criteria[0][value]=${username}&moodlewsrestformat=json`)
        const user = res.data.users[0]
        console.log(user)
        dispatch(login({
            id: user.id,
            username: user.username,
            name: user.firstname,
            lastName:user.lastname,
            email: user.email,
            description: user.description,
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