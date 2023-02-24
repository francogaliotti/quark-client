import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { login, selectUser } from '../../features/userSlice';
import { PrimaryButton } from '../../styles/styledComponents/Buttons';
import { PrimaryInput } from '../../styles/styledComponents/Inputs';
import '../../styles/Login.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie'
import { getPublic, postPublic } from '../../services/apiService';
import Alert from '../../services/alertService';
import env from "react-dotenv";


function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const ref = useRef(null);
    const cookieRef = useRef(null)
    const params = useParams()
    const user = useSelector(selectUser);
    const cookies = new Cookies()
    let moodleData

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (user) navigate('/')
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await getMoodleData()
        await setSesskeyNull()
        await handleMoodleIFrame()
        await goHome()
    }

    const setSesskeyNull = async () => {

        const res = await postPublic(`/sesskey/`, {
            'id': moodleData.moodleUserData.id, //aca tiene que ir user.id
            'sesskey': null
        })
    }

    const handleMoodleIFrame = async () => {
        var form = document.getElementById("login")
        form.target = 'moodleframe'
        const res = await form.submit()

    }

    const getMoodleData = async () => {
        try {
            console.log(env.SERVER_URL)
            const res = await getPublic(`user/getMoodleData/${email}`)
            moodleData = res.data
        }
        catch (e) {
            console.log(e)
            Alert.error({ title: "Usuario no encontrado", message: "Intenta de nuevo" })

        }
    }

    const goHome = async () => {
        setTimeout(async () => {
            try {
                /*const loginResponse = await axios.get(`http://localhost:3030/login`,
                    //{ withCredentials: "include" }
                    )*/
                console.log(`${env.SERVER_URL}login`)
                cookieRef.current.src = `http://34.66.2.129:3030/login/`
                const profInfo = await getPublic(`/user/${moodleData.moodleUserData.id}`)

                try {
                    const res = await getPublic(`/sesskey/${moodleData.moodleUserData.id}`)
                    console.log(res)
                    if (res.data.sesskey === null) {
                        cookies.remove('QuarkSession')
                        throw "Contraseña incorrecta"
                    }
                    //cookieRef.current.src = `http://34.71.113.200:3030/login`
                    dispatch(login({
                        ...moodleData,
                        ...profInfo.data,
                        sesskey: res.data.sesskey,
                        //token: loginResponse.data.token,
                        LoggedIn: true
                    }))
                    navigate("/")
                } catch (e) {
                    console.log(e)
                    Alert.error({ title: e, message: "Intenta de nuevo" })
                }
                
            } catch (e) {
                console.log(e)
                Alert.error({ title: "Usuario incorrecto", message: "Intenta de nuevo" })
            }
        }, 2000);

    }

    return (

        <form className="login-form" ref={ref} action="http://34.66.2.129/moodle/login/index.php" onSubmit={(e) => handleSubmit(e)} method="post" id="login">
            <input type="hidden" name="logintoken" value="UfICO3IsgLmxSY7yVaN1lo4pa8O3irlV" />
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
                <a href="http://34.66.2.129/moodle/login/forgot_password.php">¿Ha extraviado la contraseña?</a>
            </div>

            <iframe id="inlineFrameExample"
                style={{ display: "none" }}
                title="Inline Frame Example"
                width="600"
                height="400"
                src="http://34.66.2.129/moodle/my/"
                name='moodleframe'>
            </iframe>
            <iframe id="inlineFrameExample"
                style={{ display: "none" }}
                title="cookieFrame"
                width="1"
                height="1"
                ref={cookieRef}
                src=""
                name='cookieFrame'>
            </iframe>
        </form>
    )
}

export default LoginForm