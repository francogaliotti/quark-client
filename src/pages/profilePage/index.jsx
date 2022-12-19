import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../styles/styledComponents/Buttons';
import { selectUser } from '../../features/userSlice';
import '../../styles/ProfilePage.css'
import { Countries } from '../../jsons/countries';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';



function ProfilePage() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const ref = useRef(null);

    const [currentLanguage, setCurrentLanguage] = useState()
    const [languages, setLanguages] = useState([]);
    const [currentSkill, setCurrentSkill] = useState()
    const [skills, setSkills] = useState([])
    const [currentAcademic, setCurrentAcademic] = useState()
    const [academics, setAcademics] = useState([])
    const [currentLabor, setCurrentLabor] = useState()
    const [labors, setLabors] = useState([])
    const [currentIndependent, setCurrentIndependent] = useState()
    const [independents, setIndependents] = useState([])

    const [basicData, setBasicData] = useState()
    const [biography, setBiography] = useState("")
    const [lanList, setLanList] = useState([]);
    const [skillList, setSkillList] = useState([])

    const handleProfileChange = async () => {
        const res = await axios.put(`https://api-perfil.uc.r.appspot.com/user/actualizar`, 
        {
            userid: user.id,
            biography
        },{
            headers: {
                authorization: sessionStorage.getItem("token")
            }
        })
        console.log(res)
    }

    useEffect(() => {
        if (!sessionStorage.getItem("sesskey")) navigate('/login')

        setBasicData({
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email,
            city: user?.city,
            phone: user?.phone,
            country: user?.country
        })
/*
        const fetchData = async () => {
            //idiomas parametrizados
            const languageList = await axios.get('https://api-perfil.uc.r.appspot.com/idiomas')
            setLanList(languageList.data)
            //habilidades parametrizadas
            const skillsList = await axios.get('https://api-perfil.uc.r.appspot.com/habilidades')
            console.log(skillsList)
            setSkillList(skillsList.data)
            //idiomas del alumno
            const resLang = await axios.get(`https://api-perfil.uc.r.appspot.com/idiomas/${user.id}`)
            const langList = resLang.data
            const langArray = []
            langList.map((lan) => {
                langArray.push({
                    id_language: lan.idIdioma,
                    level: lan.nivel,
                    id: lan.id
                })
            })
            setLanguages(langArray)
            //habilidades del alumno
            const resSk = await axios.get(`https://api-perfil.uc.r.appspot.com/habilidades/${user.id}`)
            const skList = resSk.data
            const skArray = []
            console.log(skList)
            skList.map((sk) => {
                skArray.push({
                    id_skill: sk.IdHabilidad,
                    score: sk.Score,
                    id: sk.id
                })
            })
            setSkills(skArray)
            //actividades académicas
            const resAc = await axios.get(`https://api-perfil.uc.r.appspot.com/actividadesAcademicas/${user.id}`)
            const academicList = resAc.data
            const academicArray = []
            academicList.map((ac) => {
                academicArray.push({
                    idActividad: ac.idActividad,
                    institution: ac.Institucion,
                    title: ac.Titulo,
                    beginDate: ac.FechaInicio,
                    endDate: ac.FechaFin,
                    state: ac.Estado,
                    description: ac.Descripcion
                })

            })
            setAcademics(academicArray)
            //actividades laborales
            const resLab = await axios.get(`https://api-perfil.uc.r.appspot.com/actividadesLaborales/${user.id}`)
            const laborList = resLab.data
            const laborArray = []
            laborList.map((ac) => {
                laborArray.push({
                    idActividad: ac.idActividad,
                    company: ac.Empresa,
                    title: ac.Titulo,
                    beginDate: ac.FechaInicio,
                    endDate: ac.FechaFin,
                    state: ac.Estado,
                    description: ac.Descripcion
                })

            })
            setLabors(laborArray)
            //actividades independientes
            const resInd = await axios.get(`https://api-perfil.uc.r.appspot.com/actividadesIndependientes/${user.id}`)
            const indepList = resInd.data
            const indepArray = []
            indepList.map((ac) => {
                indepArray.push({
                    idActividad: ac.idActividad,
                    title: ac.Titulo,
                    beginDate: ac.FechaInicio,
                    endDate: ac.FechaFin,
                    state: ac.Estado,
                    description: ac.Descripcion
                })

            })
            setIndependents(indepArray)
        }
        fetchData()*/

    }, []);

    return (
        <div className="profilePageContainer">
            <div className="leftContainer">
                <div className="basicInfo">
                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
                    <h2 className="name">{user?.username}</h2>
                </div>
                <div className="descriptionContainer">
                    <h3>Añade tu CV</h3>
                    <PrimaryButton onClick={() => ref.current.click()}>Añadir CV</PrimaryButton>
                    <input ref={ref} type='file' id="getFile" />
                </div>
            </div>
            <div className="rightContainer">
                <div className="aboutContainer">
                    <h3>Sobre mí</h3>
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Nombre</label>
                            <input type="text" value={basicData?.firstname} onChange={(event) => setBasicData({ ...basicData, firstname: event.target.value })} />
                        </div>
                        <div className="fillForm">
                            <label>Apellido</label>
                            <input type="text" value={basicData?.lastname} onChange={(event) => setBasicData({ ...basicData, lastname: event.target.value })} />
                        </div>
                        <div className="fillForm">
                            <label>Email</label>
                            <input type="text" value={basicData?.email} onChange={(event) => setBasicData({ ...basicData, email: event.target.value })} />
                        </div>
                        {/*<div className="fillForm">
                            <label>Genero</label>
                            <select name="" id="">
                                <option value=""> </option>
                                <option value="">Masculino</option>
                                <option value="">Femenino</option>
                                <option value="">No especifica</option>
                            </select>
                        </div>
                        <div className="fillForm">
                            <label>Fecha de Nacimiento</label>
                            <input type="date" />
                        </div>*/}
                        <div className="fillForm">
                            <label>Telefono</label>
                            <input type="text" value={basicData?.phone} onChange={(event) => setBasicData({ ...basicData, phone: event.target.value })} />
                        </div>
                        <div className="fillForm">
                            <label>Pais</label>
                            <select name="" id="" value={basicData?.country} onChange={(event) => setBasicData({ ...basicData, country: event.target.value })}>
                                <option value=""></option>
                                {Countries.map((c) => {
                                    return <option value={c?.iso2}>{c?.nombre}</option>
                                })}
                            </select>
                        </div>
                        <div className="fillForm">
                            <label>Ciudad</label>
                            <input type="text" value={basicData?.city} onChange={(event) => setBasicData({ ...basicData, city: event.target.value })} />
                        </div>
                    </div>
                </div>
                <div className="descriptionContainer">
                        <h3>Mi Biografía</h3>
                        <textarea value={user?.biography} onChange={(event) => setBiography(event.target.value)}></textarea>
                    </div>

                <PrimaryButton onClick={() => handleProfileChange()}>Guardar</PrimaryButton>


            </div>

        </div >

    )
}


export default ProfilePage