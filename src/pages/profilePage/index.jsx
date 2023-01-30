import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../styles/styledComponents/Buttons';
import { login, selectUser } from '../../features/userSlice';
import '../../styles/ProfilePage.css'
import { Countries } from '../../jsons/countries';
import Cookies from 'universal-cookie';
import { getPublic, postPublic, putPublic } from '../../services/apiService';
import Alert from '../../services/alertService';



function ProfilePage() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const refCV = useRef(null);
    const refImg = useRef(null);
    const dispatch = useDispatch();
    const cookies = new Cookies()

    const [userGeneralData, setUserGeneralData] = useState({})

    const handleProfileChange = async () => {
        try {
            const res = await putPublic(`/user/update`, {
                userid: user.id,
                userGeneralData
            })
            Alert.success({title: "Actualizado!", message: "Perfil actualizado"})
            await updateData()
        } catch (e) {
            console.log(e)
            Alert.error({title: "Error!", message: e.response.data.msg})
        }
    }

    useEffect(() => {
        if (!cookies.get('myCookieName')) navigate('/login')

        setUserGeneralData({
            biography: user?.userBasicDatum.biography,
            nickname: user?.userBasicDatum.nickname,
            birthdate: user?.userBasicDatum.birthdate,
            firstname: user?.moodleUserData.firstname,
            lastname: user?.moodleUserData.lastname,
            email: user?.moodleUserData.email,
            city: user?.moodleUserData.city,
            phone: user?.moodleUserData.phone,
            country: user?.moodleUserData.country
        })


    }, [user]);

    const handleProfileImg = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file)
            formData.append("userid", user.id);
            const res = await postPublic(`/userImg/upload`, formData)
            console.log(res)
            Alert.success({title: 'Actualizado!', message: 'Imagen actualizada'})
            await updateData()

        } catch (e) {
            console.log(e)
            Alert.error({title: 'Error!', message: e.response.data.msg})
        }
    }

    const updateData = async () => {
        const profInfo = await getPublic(`/user/${user.id}`)
        dispatch(login({
            ...user,
            ...profInfo.data,
        }))
    }

    return (
        <div className="profilePageContainer">
            <div className="leftContainer">
                <div className="basicInfo">

                    <img src={user?.userBasicDatum.imgUrl} />

                    <PrimaryButton onClick={() => refImg.current.click()}>Cambiar Imagen</PrimaryButton>
                    <input ref={refImg} type='file' id="getFile" accept="image/png, image/jpeg, image/jpg" onChange={(e) => handleProfileImg(e.target.files[0])} />
                    <h2 className="name">{user?.username}</h2>
                </div>
                {/*<div className="descriptionContainer">
                    <h3>Añade tu CV</h3>
                    <PrimaryButton onClick={() => refCV.current.click()}>Añadir CV</PrimaryButton>
                    <input ref={refCV} type='file' accept='.pdf' id="getFile" />
    </div>*/}
            </div>
            <div className="rightContainer">
                <div className="aboutContainer">
                    <h3>Sobre mí</h3>
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Nombre</label>
                            <input type="text" value={userGeneralData?.firstname} onChange={(event) => setUserGeneralData({ ...userGeneralData, firstname: event.target.value })} />
                        </div>
                        <div className="fillForm">
                            <label>Apellido</label>
                            <input type="text" value={userGeneralData?.lastname} onChange={(event) => setUserGeneralData({ ...userGeneralData, lastname: event.target.value })} />
                        </div>
                        <div className="fillForm">
                            <label>Email</label>
                            <input type="text" value={userGeneralData?.email} onChange={(event) => setUserGeneralData({ ...userGeneralData, email: event.target.value })} />
                        </div>
                        <div className="fillForm">
                            <label>Fecha de Nacimiento</label>
                            <input type="date" value={userGeneralData?.birthdate} onChange={(e) => setUserGeneralData({ ...userGeneralData, birthdate: e.target.value })} />
                        </div>
                        <div className="fillForm">
                            <label>Telefono</label>
                            <input type="text" value={userGeneralData?.phone} onChange={(event) => setUserGeneralData({ ...userGeneralData, phone: event.target.value })} />
                        </div>
                        <div className="fillForm">
                            <label>Pais</label>
                            <select name="" id="" value={userGeneralData?.country} onChange={(event) => setUserGeneralData({ ...userGeneralData, country: event.target.value })}>
                                <option value=""></option>
                                {Countries.map((c) => {
                                    return <option value={c?.iso2}>{c?.nombre}</option>
                                })}
                            </select>
                        </div>
                        <div className="fillForm">
                            <label>Ciudad</label>
                            <input type="text" value={userGeneralData?.city} onChange={(event) => setUserGeneralData({ ...userGeneralData, city: event.target.value })} />
                        </div>
                        <div className="fillForm">
                            <label>Nick Name</label>
                            <input type="text" value={userGeneralData?.nickname} onChange={(e) => setUserGeneralData({ ...userGeneralData, nickname: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div className="descriptionContainer">
                    <h3>Mi Biografía</h3>
                    <textarea value={userGeneralData?.biography} onChange={(e) => setUserGeneralData({ ...userGeneralData, biography: e.target.value })}></textarea>
                </div>

                <PrimaryButton onClick={() => handleProfileChange()}>Guardar</PrimaryButton>


            </div>

        </div >

    )
}


export default ProfilePage