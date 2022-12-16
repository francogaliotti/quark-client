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

    const addLanguage = async () => {
        if (currentLanguage && currentLanguage.id_language && currentLanguage.level) {
            var exist = false
            languages.map((l) => {
                if (l.id_language === currentLanguage.id_language) {
                    exist = true
                }
            })
            if (!exist) {
                const res = await axios.post(`https://api-perfil.uc.r.appspot.com/idiomas/crear`,
                    {
                        userid: user.id,
                        languages: {
                            id: currentLanguage.id_language,
                            level: currentLanguage.level
                        }
                    })
                    console.log(res)
                setLanguages([...languages, {...currentLanguage, id: res.data.id}])
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Idioma existente'
                })
            }
        }
    }

    /*const editLanguage = (lan) => {
        setCurrentLanguage({ ...lan, edited: true })
        setLanguages(languages.filter(l => l !== lan))
    }*/

    const deleteLanguage = async (lan) => {
        console.log(lan)
        Swal.fire({
            title: 'Deseas eliminar este idioma?',
            text: "Esta acción es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/idiomas/borrar/${lan.id}`)
                console.log(res)
                Swal.fire(
                    'Eliminado!',
                    'Idioma eliminado.',
                    'success'
                )
                setLanguages(languages.filter(l => l !== lan))
            }
        })

    }

    const addSkill = async () => {
        if (currentSkill && currentSkill.id_skill && currentSkill.score) {
            var exist = false
            skills.map((l) => {
                if (l.id_skill === currentSkill?.id_skill) {
                    exist = true
                }
            })
            if (!exist) {
                const res = await axios.post(`https://api-perfil.uc.r.appspot.com/habilidades/crear`,
                    {
                        userid: user.id,
                        skills: {
                            id_skill: currentSkill.id_skill,
                            score: currentSkill.score
                        }
                    })
                    console.log(res)
                setSkills([...skills, {...currentSkill, id: res.data.id}])
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Habilidad existente'
                })
            }
        }
    }

    const deleteSkill = async (sk) => {
        console.log(sk)
        Swal.fire({
            title: 'Deseas quitar esta habilidad?',
            text: "Esta acción es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/habilidades/borrar/${sk.id}`)
                console.log(res)
                Swal.fire(
                    'Eliminado!',
                    'Habilidad quitada.',
                    'success'
                )
                setSkills(skills.filter(l => l !== sk))
            }
        })

    }

    const addAcademic = async () => {
        if (currentAcademic && currentAcademic.institution && currentAcademic.title && currentAcademic.state) {
            if (!currentAcademic.edited) {
                const res = await axios.post(`https://api-perfil.uc.r.appspot.com/actividadesAcademicas/crear`,
                    {
                        userid: user.id,
                        academics: {
                            institution: currentAcademic.institution,
                            title: currentAcademic.title,
                            state: currentAcademic.state,
                            beginDate: currentAcademic.beginDate,
                            endDate: currentAcademic.endDate,
                            description: currentAcademic.description
                        }
                    }
                )
                setAcademics([...academics, { ...currentAcademic, idActividad: res.data.id }])
                console.log(res)
            } else {
                const res = await axios.put(`https://api-perfil.uc.r.appspot.com/actividadesAcademicas/actualizar`,
                    {
                        idActividad: currentAcademic.idActividad,
                        academics: {
                            institution: currentAcademic.institution,
                            title: currentAcademic.title,
                            state: currentAcademic.state,
                            beginDate: currentAcademic.beginDate,
                            endDate: currentAcademic.endDate,
                            description: currentAcademic.description
                        }
                    }
                )
                setAcademics([...academics, currentAcademic])
                console.log(res)
            }
            setCurrentAcademic({
                ...currentAcademic,
                institution: "",
                title: "",
                //state:"",
                beginDate: "",
                endDate: "",
                description: "",
                edited: false
            })
        }
    }

    const editAcademic = (ac) => {
        setCurrentAcademic({ ...ac, edited: true })
        setAcademics(academics.filter(l => l !== ac))
    }

    const deleteAcademic = async (ac) => {
        Swal.fire({
            title: 'Deseas eliminar esta actividad?',
            text: "Esta acción es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/actividadesAcademicas/borrar/${ac.idActividad}`)
                Swal.fire(
                    'Eliminado!',
                    'Actividad eliminada.',
                    'success'
                )
                setAcademics(academics.filter(l => l !== ac))
            }
        })

    }

    const addLabor = async () => {
        if (currentLabor && currentLabor.company && currentLabor.title) {
            if (!currentLabor.edited) {
                const res = await axios.post(`https://api-perfil.uc.r.appspot.com/actividadesLaborales/crear`,
                    {
                        userid: user.id,
                        labors: {
                            company: currentLabor.company,
                            title: currentLabor.title,
                            state: currentAcademic.state,
                            beginDate: currentLabor.beginDate,
                            endDate: currentLabor.endDate,
                            description: currentLabor.description
                        }
                    }
                )
                console.log(res)
                setLabors([...labors, { ...currentLabor, idActividad: res.data.id }])
            } else {
                console.log(currentLabor)
                const res = await axios.put(`https://api-perfil.uc.r.appspot.com/actividadesLaborales/actualizar`,
                    {
                        idActividad: currentLabor.idActividad,
                        labors: {
                            company: currentLabor.company,
                            title: currentLabor.title,
                            state: currentLabor.state,
                            beginDate: currentLabor.beginDate,
                            endDate: currentLabor.endDate,
                            description: currentLabor.description
                        }
                    }
                )
                setLabors([...labors, currentLabor])
            }
            setCurrentLabor({
                ...currentLabor,
                company: "",
                title: "",
                //state:"",
                beginDate: "",
                endDate: "",
                description: "",
                edited: false
            })
        }
    }

    const editLabor = (lab) => {
        setCurrentLabor({ ...lab, edited: true })
        setLabors(labors.filter(l => l !== lab))
    }

    const deleteLabor = async (lab) => {
        Swal.fire({
            title: 'Deseas eliminar esta actividad?',
            text: "Esta acción es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/actividadesLaborales/borrar/${lab.idActividad}`)
                Swal.fire(
                    'Eliminado!',
                    'Actividad eliminada.',
                    'success'
                )
                setLabors(labors.filter(l => l !== lab))
            }
        })

    }

    const addIndependent = async () => {
        if (currentIndependent && currentIndependent.title) {
            if (!currentIndependent.edited) {
                const res = await axios.post(`https://api-perfil.uc.r.appspot.com/actividadesIndependientes/crear`,
                    {
                        userid: user.id,
                        independents: {
                            title: currentIndependent.title,
                            state: currentIndependent.state,
                            beginDate: currentIndependent.beginDate,
                            endDate: currentIndependent.endDate,
                            description: currentIndependent.description
                        }
                    }
                )
                setIndependents([...independents, { ...currentIndependent, idActividad: res.data.id }])
            } else {
                const res = await axios.put(`https://api-perfil.uc.r.appspot.com/actividadesIndependientes/actualizar`,
                    {
                        idActividad: currentIndependent.idActividad,
                        independents: {
                            title: currentIndependent.title,
                            state: currentIndependent.state,
                            beginDate: currentIndependent.beginDate,
                            endDate: currentIndependent.endDate,
                            description: currentIndependent.description
                        }
                    }
                )
                setIndependents([...independents, currentIndependent])
            }
            setCurrentIndependent({
                ...currentIndependent,
                title: "",
                //state:"",
                beginDate: "",
                endDate: "",
                description: "",
                edited: false
            })
        }
    }

    const editIndependent = (ind) => {
        setCurrentIndependent({ ...ind, edited: true })
        setIndependents(independents.filter(l => l !== ind))
    }

    const deleteIndependent = async (ind) => {
        Swal.fire({
            title: 'Deseas eliminar esta actividad?',
            text: "Esta acción es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/actividadesIndependientes/borrar/${ind.idActividad}`)
                Swal.fire(
                    'Eliminado!',
                    'Actividad eliminada.',
                    'success'
                )
                setIndependents(independents.filter(l => l !== ind))
            }
        })

    }

    const handleProfileChange = async () => {
        const userId = user.id
        const info = {
            userId,
            basicData,
            languages,
            academics,
            labors,
            independents,
            biography
        }
        console.log(info)
        try {
            const res = await axios.post(`https://api-perfil.uc.r.appspot.com/profileInfo/crear`, info)
            console.log(JSON.stringify(info))
        } catch (e) {
            console.log(e)
        }
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
        fetchData()

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
                <div className="descriptionContainer">
                    <h3>Mi Biografía</h3>
                    <textarea value={user?.biography} onChange={(event) => setBiography(event.target.value)}></textarea>
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


                <div className="aboutContainer">
                    <h3>Actividad Académica</h3>
                    {academics?.map(lan => {
                        return (
                            <div className="fillForms">
                                <div className="fillForm">
                                    <label>Institución</label>
                                    <label>{lan?.institution}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Título</label>
                                    <label>{lan?.title}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Estado</label>
                                    <label>{lan?.state}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Fecha de Inicio</label>
                                    <label>{new Date(lan?.beginDate).toLocaleDateString("en-AU")}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Fecha Finalización</label>
                                    <label>{new Date(lan?.endDate).toLocaleDateString("en-AU")}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Descripción</label>
                                    <label id='activityDescription'>{lan?.description}</label>
                                </div>
                                <div className="crudButtons">
                                    <button className='plus' onClick={() => editAcademic(lan)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                    <button className='plus' onClick={() => deleteAcademic(lan)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                </div>
                            </div>

                        )
                    })}
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Institución</label>
                            <input type="text" value={currentAcademic?.institution} onChange={(event) => { setCurrentAcademic({ ...currentAcademic, institution: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Título</label>
                            <input type="text" value={currentAcademic?.title} onChange={(event) => { setCurrentAcademic({ ...currentAcademic, title: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Estado</label>
                            <select name="" id="" onClick={(event) => { setCurrentAcademic({ ...currentAcademic, state: event.target.value }) }}>
                                <option value=""></option>
                                <option value="En curso">En curso</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        </div>
                        <div className="fillForm">
                            <label>Fecha de Inicio</label>
                            <input type="date" value={currentAcademic?.beginDate} onChange={(event) => { setCurrentAcademic({ ...currentAcademic, beginDate: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Fecha Finalización</label>
                            <input type="date" value={currentAcademic?.endDate} onChange={(event) => { setCurrentAcademic({ ...currentAcademic, endDate: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Descripción</label>
                            <textarea type="date" value={currentAcademic?.description} onChange={(event) => { setCurrentAcademic({ ...currentAcademic, description: event.target.value }) }} />
                        </div>
                    </div>

                    <button className='plus' onClick={() => addAcademic()}><FontAwesomeIcon icon={faPlus} /></button>

                </div>

                <div className="aboutContainer">
                    <h3>Actividad Laboral</h3>
                    {labors?.map(lan => {
                        return (
                            <div className="fillForms">
                                <div className="fillForm">
                                    <label>Empresa</label>
                                    <label>{lan?.company}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Título</label>
                                    <label>{lan?.title}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Estado</label>
                                    <label>{lan?.state}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Fecha de Inicio</label>
                                    <label>{new Date(lan?.beginDate).toLocaleDateString("en-AU")}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Fecha Finalización</label>
                                    <label>{new Date(lan?.endDate).toLocaleDateString("en-AU")}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Descripción</label>
                                    <label>{lan?.description}</label>
                                </div>
                                <button className='plus' onClick={() => editLabor(lan)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                <button className='plus' onClick={() => deleteLabor(lan)}><FontAwesomeIcon icon={faTrashCan} /></button>
                            </div>

                        )
                    })}
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Empresa</label>
                            <input type="text" value={currentLabor?.company} onChange={(event) => { setCurrentLabor({ ...currentLabor, company: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Título</label>
                            <input type="text" value={currentLabor?.title} onChange={(event) => { setCurrentLabor({ ...currentLabor, title: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Estado</label>
                            <select name="" id="" onClick={(event) => { setCurrentLabor({ ...currentLabor, state: event.target.value }) }}>
                                <option value=""></option>
                                <option value="En curso">En curso</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        </div>
                        <div className="fillForm">
                            <label>Fecha de Inicio</label>
                            <input type="date" value={currentLabor?.beginDate} onChange={(event) => { setCurrentLabor({ ...currentLabor, beginDate: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Fecha Finalización</label>
                            <input type="date" value={currentLabor?.endDate} onChange={(event) => { setCurrentLabor({ ...currentLabor, endDate: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Descripción</label>
                            <textarea type="date" value={currentLabor?.description} onChange={(event) => { setCurrentLabor({ ...currentLabor, description: event.target.value }) }} />
                        </div>

                    </div>

                    <button className='plus' onClick={() => addLabor()}><FontAwesomeIcon icon={faPlus} /></button>

                </div>

                <div className="aboutContainer">
                    <h3>Actividad Independiente</h3>
                    {independents?.map(lan => {
                        return (
                            <div className="fillForms">
                                <div className="fillForm">
                                    <label>Título</label>
                                    <label>{lan?.title}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Estado</label>
                                    <label>{lan?.state}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Fecha de Inicio</label>
                                    <label>{new Date(lan?.beginDate).toLocaleDateString("en-AU")}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Fecha Finalización</label>
                                    <label>{new Date(lan?.endDate).toLocaleDateString("en-AU")}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Descripción</label>
                                    <label>{lan?.description}</label>
                                </div>
                                <button className='plus' onClick={() => editIndependent(lan)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                <button className='plus' onClick={() => deleteIndependent(lan)}><FontAwesomeIcon icon={faTrashCan} /></button>
                            </div>

                        )
                    })}
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Título</label>
                            <input type="text" value={currentIndependent?.title} onChange={(event) => { setCurrentIndependent({ ...currentIndependent, title: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Estado</label>
                            <select name="" id="" onClick={(event) => { setCurrentIndependent({ ...currentIndependent, state: event.target.value }) }}>
                                <option value=""></option>
                                <option value="En curso">En curso</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        </div>
                        <div className="fillForm">
                            <label>Fecha de Inicio</label>
                            <input type="date" value={currentIndependent?.beginDate} onChange={(event) => { setCurrentIndependent({ ...currentIndependent, beginDate: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Fecha Finalización</label>
                            <input type="date" value={currentIndependent?.endDate} onChange={(event) => { setCurrentIndependent({ ...currentIndependent, endDate: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Descripción</label>
                            <textarea type="date" value={currentIndependent?.description} onChange={(event) => { setCurrentIndependent({ ...currentIndependent, description: event.target.value }) }} />
                        </div>

                    </div>

                    <button className='plus' onClick={() => addIndependent()}><FontAwesomeIcon icon={faPlus} /></button>

                </div>


                <div className="aboutContainer">
                    <h3>Idiomas</h3>
                    {languages?.map(lan => {
                        return (
                            <div className="fillForms">
                                <div className="fillForm">
                                    <label>Idioma</label>
                                    <label>{lanList.map((l) => {
                                        if (l.id_idioma == lan.id_language) {
                                            return l.nombre
                                        }
                                    })}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Nivel</label>
                                    <label>{lan?.level}</label>
                                </div>
                                <button className='plus' onClick={() => deleteLanguage(lan)}><FontAwesomeIcon icon={faTrashCan} /></button>
                            </div>
                        )
                    })}
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Idioma</label>
                            <select onClick={(v) => {
                                const languagesSelected = lanList.filter((l) => l.id_idioma == v.target.value)
                                const languageSelected = languagesSelected[0]
                                setCurrentLanguage({ ...currentLanguage, language: languageSelected?.nombre, id_language: languageSelected?.id_idioma })
                            }} id="">
                                <option value=""></option>
                                {lanList.map((l) => {
                                    return (<option value={l.id_idioma}>{l.nombre}</option>)
                                })}
                            </select>
                        </div>
                        <div className="fillForm">
                            <label>Nivel</label>
                            <select onClick={(v) => setCurrentLanguage({ ...currentLanguage, level: v.target.value })} id="">
                                <option value=""></option>
                                <option value="C2">C2</option>
                                <option value="C1">C1</option>
                                <option value="B2">B2</option>
                                <option value="B1">B1</option>
                                <option value="A2">A2</option>
                                <option value="A1">A1</option>
                            </select>
                        </div>

                    </div>

                    <button className='plus' onClick={() => addLanguage()}><FontAwesomeIcon icon={faPlus} /></button>
                </div>

                <div className="aboutContainer">
                    <h3>Habilidades</h3>
                    {skills?.map(sk => {
                        return (
                            <div className="fillForms">
                                <div className="fillForm">
                                    <label>Habilidad</label>
                                    <label>{skillList.map((l) => {
                                        if (l.id == sk.id_skill) {
                                            return l.nombre
                                        }
                                    })}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Puntaje</label>
                                    <label>{sk?.score}</label>
                                </div>
                                <button className='plus' onClick={() => deleteSkill(sk)}><FontAwesomeIcon icon={faTrashCan} /></button>
                            </div>
                        )
                    })}
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Habilidad</label>
                            <select onClick={(v) => {
                                const skillsSelected = skillList.filter((l) => l.id == v.target.value)
                                const skillSelected = skillsSelected[0]
                                setCurrentSkill({ ...currentSkill, skill: skillSelected?.nombre, id_skill: skillSelected?.id })
                            }} id="">
                                <option value=""></option>
                                {skillList.map((l) => {
                                    return (<option value={l.id}>{l.nombre}</option>)
                                })}
                            </select>
                        </div>
                        <div className="fillForm">
                            <label>Puntaje</label>
                            <div className='inputRadios'>
                                <input type="radio" value="1" id='1' name='score' onClick={(e)=>setCurrentSkill({...currentSkill, score: e.target.value})}/>
                                <label for="1">1</label>
                                <input type="radio" value="2" id='2' name='score' onClick={(e)=>setCurrentSkill({...currentSkill, score: e.target.value})}/>
                                <label for="2">2</label>
                                <input type="radio" value="3" id='3' name='score' onClick={(e)=>setCurrentSkill({...currentSkill, score: e.target.value})}/>
                                <label for="3">3</label>
                                <input type="radio" value="4" id='4' name='score' onClick={(e)=>setCurrentSkill({...currentSkill, score: e.target.value})}/>
                                <label for="4">4</label>
                                <input type="radio" value="5" id='5' name='score' onClick={(e)=>setCurrentSkill({...currentSkill, score: e.target.value})}/>
                                <label for="5">5</label>
                            </div>
                        </div>

                    </div>

                    <button className='plus' onClick={() => addSkill()}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <PrimaryButton onClick={() => console.log(currentSkill)}>Guardar</PrimaryButton>
            </div >
        </div >
    )
}


export default ProfilePage