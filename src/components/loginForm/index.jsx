import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { login } from '../../features/userSlice';
import { PrimaryButton } from '../../styles/styledComponents/Buttons';
import { PrimaryInput } from '../../styles/styledComponents/Inputs';
import '../../styles/Login.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const ref = useRef(null);
    const params = useParams()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleMoodleIFrame()
        await goHome()
    }

    const handleMoodleIFrame = async () => {
        var form = document.getElementById("login")
        form.target = 'moodleframe'
        const res = await form.submit()

    }

    const goHome = async () => {
        setTimeout(async () => {
            try {
                const res = await axios.get(`https://api-perfil.uc.r.appspot.com/user/${email}`)
                const user = res.data
                try{
                    const res = await axios.get("https://api-perfil.uc.r.appspot.com/sesskey/4") //aca tendria que usar user.id
                    if (res.data[0].sesskey === ""){
                        throw "Contraseña incorrecta"
                    }
                    dispatch(login({
                        ...user,
                        sesskey : res.data[0].sesskey,
                        password: password,
                        LoggedIn: true
                    }))
                } catch (e) {
                    console.log(e)
                    Swal.fire({
                        icon: 'error',
                        title: e,
                        text: 'Intenta de nuevo'
                    })
                }
                navigate("/")
            } catch (e) {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario incorrecto',
                    text: 'Intenta de nuevo'
                })
            }
        }, 1000);

    }

    return (

        <form className="login-form" ref={ref} action="http://localhost/moodle/login/index.php" onSubmit={(e) => handleSubmit(e)} method="post" id="login">
            <input type="hidden" name="logintoken" value="aHuEaKUub63tg4ONOX8E8wYnHupAyBKI" />
            <div className="login-form-username form-group singleField" id="yui_3_17_2_1_1669123034452_20">
                <label for="username" class="sr-only">
                    Nombre de usuario
                </label>
                <PrimaryInput type="text" name="username" id="username" className="form-control form-control-lg" placeholder="Nombre de usuario" autoComplete="username" onChange={(event) => { setEmail(event.target.value) }} />
            </div>
            <div class="login-form-password form-group singleField">
                <label for="password" className="sr-only">Contraseña</label>
                <PrimaryInput type="password" name="password" id="password" class="form-control form-control-lg" placeholder="Contraseña" autoComplete="current-password" onChange={(event) => { setPassword(event.target.value) }} />
            </div>
            <PrimaryButton type="submit" id="loginbtn" onClick="this.form.target='moodleframe'">Acceder</PrimaryButton>
            <div className="login-form-forgotpassword form-group">
                <a href="http://localhost/moodle/login/forgot_password.php">¿Ha extraviado la contraseña?</a>
            </div>
            
            <iframe id="inlineFrameExample"
                style={{ display: "none" }}
                title="Inline Frame Example"
                width="600"
                height="400"
                src="http://localhost/moodle/my/"
                name='moodleframe'>
            </iframe>
        </form>
    )
}

export default LoginForm