import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectUser } from '../../../features/userSlice';
import '../../../styles/ProfilePage.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';

function EditProfesionalProfile() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const [lanList, setLanList] = useState([]);
    const [skillList, setSkillList] = useState([])

    const addLanguage = async () => {
        if (currentLanguage && currentLanguage.languageId && currentLanguage.level) {
            var exist = false
            languages.map((l) => {
                if (l.languageId === currentLanguage.languageId) {
                    exist = true
                }
            })
            if (!exist) {
                Swal.fire({
                    title: 'Añadir idioma?',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Añadir',
                    cancelButtonText: "Cancelar"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const res = await axios.post(`https://api-perfil.uc.r.appspot.com/languages/create`,
                            {
                                userid: user.id,
                                languages: {
                                    id: currentLanguage.languageId,
                                    level: currentLanguage.level
                                }
                            }, {
                            headers: {
                                authorization: sessionStorage.getItem("token")
                            }
                        })
                        console.log(res)

                        Swal.fire(
                            'Añadido!',
                            'Idioma añadido.',
                            'success'
                        )
                        await updateState('language')
                        setLanguages([...languages, { ...currentLanguage, id: res.data.id }])
                    }
                })


            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Idioma existente'
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Faltan datos por ingresar.'
            })
        }
    }

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
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/languages/delete/${lan.id}`, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                })
                console.log(res)
                Swal.fire(
                    'Eliminado!',
                    'Idioma eliminado.',
                    'success'
                )
                await updateState('language')
                setLanguages(languages.filter(l => l !== lan))
            }
        })

    }

    const addSkill = async () => {
        if (currentSkill && currentSkill.skillId && currentSkill.score) {
            var exist = false
            skills.map((l) => {
                if (l.skillId === currentSkill?.skillId) {
                    exist = true
                }
            })
            if (!exist) {

                Swal.fire({
                    title: 'Añadir habilidad?',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Añadir',
                    cancelButtonText: "Cancelar"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const res = await axios.post(`https://api-perfil.uc.r.appspot.com/skills/create`,
                            {
                                userid: user.id,
                                skills: {
                                    id: currentSkill.skillId,
                                    score: currentSkill.score
                                }
                            }, {
                            headers: {
                                authorization: sessionStorage.getItem("token")
                            }
                        })


                        Swal.fire(
                            'Añadido!',
                            'Habilidad añadida.',
                            'success'
                        )
                        await updateState('skill')
                        setSkills([...skills, { ...currentSkill, id: res.data.id }])
                    }
                })



            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Habilidad existente'
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Faltan datos por ingresar.'
            })
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
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/skills/delete/${sk.id}`, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                })
                console.log(res)
                Swal.fire(
                    'Eliminado!',
                    'Habilidad quitada.',
                    'success'
                )
                await updateState('skill')
                setSkills(skills.filter(l => l !== sk))
            }
        })

    }

    const addActivity = async (type) => {
        switch (type) {
            case "academic":
                if (currentAcademic && currentAcademic.institution && currentAcademic.title && currentAcademic.state && currentAcademic.beginDate) {
                    if (currentAcademic.state == "Finalizado") {
                        if (!currentAcademic.endDate) {
                            Swal.fire(
                                'Error!',
                                'Ingresar fecha de finalización.',
                                'error'
                            )
                        } else {
                            await addAcademic()
                        }
                    } else {
                        await addAcademic()
                    }
                } else {
                    Swal.fire(
                        'Error!',
                        'Faltan datos por ingresar.',
                        'error'
                    )
                }
                break
            case "labor":
                if (currentLabor && currentLabor.company && currentLabor.title && currentLabor.state && currentLabor.beginDate) {
                    if (currentLabor.state == "Finalizado") {
                        if (!currentLabor.endDate) {
                            Swal.fire(
                                'Error!',
                                'Ingresar fecha de finalización.',
                                'error'
                            )
                        } else {
                            await addLabor()
                        }
                    } else {
                        await addLabor()
                    }
                } else {
                    Swal.fire(
                        'Error!',
                        'Faltan datos por ingresar.',
                        'error'
                    )
                }
                break
            case "independent":
                if (currentIndependent && currentIndependent.title && currentIndependent.state && currentIndependent.beginDate) {
                    if (currentIndependent.state == "Finalizado") {
                        if (!currentIndependent.endDate) {
                            Swal.fire(
                                'Error!',
                                'Ingresar fecha de finalización.',
                                'error'
                            )
                        } else {
                            await addIndependent()
                        }
                    } else {
                        await addIndependent()
                    }
                } else {
                    Swal.fire(
                        'Error!',
                        'Faltan datos por ingresar.',
                        'error'
                    )
                }
                break
        }
    }

    //Métodos de actividades académicas
    const addAcademic = async () => {
        if (!currentAcademic.edited) {
            Swal.fire({
                title: 'Añadir actividad académica?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Añadir',
                cancelButtonText: "Cancelar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.post(`https://api-perfil.uc.r.appspot.com/academics/create`,
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
                        }, {
                        headers: {
                            authorization: sessionStorage.getItem("token")
                        }
                    }
                    )

                    Swal.fire(
                        'Añadido!',
                        'Actividad académica añadida.',
                        'success'
                    )
                    await updateState('academic')
                    setAcademics([...academics, { ...currentAcademic, id: res.data.id }])
                    console.log(res)
                }
            })
        } else {
            const res = await axios.put(`https://api-perfil.uc.r.appspot.com/academics/update`,
                {
                    id: currentAcademic.id,
                    academics: {
                        institution: currentAcademic.institution,
                        title: currentAcademic.title,
                        state: currentAcademic.state,
                        beginDate: currentAcademic.beginDate,
                        endDate: currentAcademic.endDate,
                        description: currentAcademic.description
                    }
                }, {
                headers: {
                    authorization: sessionStorage.getItem("token")
                }
            }
            )
            Swal.fire(
                'Actualizado!',
                'Actividad académica actualizada.',
                'success'
            )
            await updateState('academic')
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

    const editAcademic = (ac) => {
        Swal.fire({
            title: 'Deseas actualizar esta actividad?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Actualizar',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setCurrentAcademic({ ...ac, edited: true })
                setAcademics(academics.filter(l => l !== ac))
            }
        })

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
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/academics/delete/${ac.id}`/*, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                }*/)
                Swal.fire(
                    'Eliminado!',
                    'Actividad eliminada.',
                    'success'
                )
                await updateState('academic')
                setAcademics(academics.filter(l => l !== ac))
            }
        })

    }

    //Métodos de actividades laborales
    const addLabor = async () => {
            if (!currentLabor.edited) {
                Swal.fire({
                    title: 'Añadir actividad laboral?',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Añadir',
                    cancelButtonText: "Cancelar"
                }).then(async (result) => {
                    const res = await axios.post(`https://api-perfil.uc.r.appspot.com/labors/create`,
                        {
                            userid: user.id,
                            labors: {
                                company: currentLabor.company,
                                title: currentLabor.title,
                                state: currentLabor.state,
                                beginDate: currentLabor.beginDate,
                                endDate: currentLabor.endDate,
                                description: currentLabor.description
                            }
                        }, {
                        headers: {
                            authorization: sessionStorage.getItem("token")
                        }
                    }
                    )


                    Swal.fire(
                        'Añadido!',
                        'Actividad laboral añadida.',
                        'success'
                    )
                    await updateState('labor')
                    setLabors([...labors, { ...currentLabor, id: res.data.id }])
                }
                )


            } else {
                console.log(currentLabor)
                const res = await axios.put(`https://api-perfil.uc.r.appspot.com/labors/update`,
                    {
                        id: currentLabor.id,
                        labors: {
                            company: currentLabor.company,
                            title: currentLabor.title,
                            state: currentLabor.state,
                            beginDate: currentLabor.beginDate,
                            endDate: currentLabor.endDate,
                            description: currentLabor.description
                        }
                    }, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                }
                )
                Swal.fire(
                    'Actualizado!',
                    'Actividad laboral actualizada.',
                    'success'
                )
                await updateState('labor')
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

    const editLabor = (lab) => {
        Swal.fire({
            title: 'Deseas actualizar esta actividad?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Actualizar',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setCurrentLabor({ ...lab, edited: true })
                setLabors(labors.filter(l => l !== lab))
            }
        })

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
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/labors/delete/${lab.id}`, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                })
                Swal.fire(
                    'Eliminado!',
                    'Actividad eliminada.',
                    'success'
                )
                await updateState('labor')
                setLabors(labors.filter(l => l !== lab))
            }
        })

    }

    const addIndependent = async () => {
            if (!currentIndependent.edited) {

                Swal.fire({
                    title: 'Añadir actividad independiente?',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Añadir',
                    cancelButtonText: "Cancelar"
                }).then(async (result) => {
                    const res = await axios.post(`https://api-perfil.uc.r.appspot.com/independents/create`,
                        {
                            userid: user.id,
                            independents: {
                                title: currentIndependent.title,
                                state: currentIndependent.state,
                                beginDate: currentIndependent.beginDate,
                                endDate: currentIndependent.endDate,
                                description: currentIndependent.description
                            }
                        }, {
                        headers: {
                            authorization: sessionStorage.getItem("token")
                        }
                    }
                    )

                    Swal.fire(
                        'Añadido!',
                        'Actividad independiente añadida.',
                        'success'
                    )
                    await updateState('independent')
                    setIndependents([...independents, { ...currentIndependent, id: res.data.id }])
                }
                )
            } else {
                const res = await axios.put(`https://api-perfil.uc.r.appspot.com/independents/update`,
                    {
                        id: currentIndependent.id,
                        independents: {
                            title: currentIndependent.title,
                            state: currentIndependent.state,
                            beginDate: currentIndependent.beginDate,
                            endDate: currentIndependent.endDate,
                            description: currentIndependent.description
                        }
                    }, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                }
                )
                Swal.fire(
                    'Actualizado!',
                    'Actividad independiente actualizada.',
                    'success'
                )
                await updateState('independent')
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

    const editIndependent = (ind) => {
        Swal.fire({
            title: 'Deseas actualizar esta actividad?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Actualizar',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setCurrentIndependent({ ...ind, edited: true })
                setIndependents(independents.filter(l => l !== ind))
            }
        })

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
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/independents/delete/${ind.id}`, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                })
                Swal.fire(
                    'Eliminado!',
                    'Actividad eliminada.',
                    'success'
                )
                await updateState('independent')
                setIndependents(independents.filter(l => l !== ind))
            }
        })

    }

    const fetchData = async () => {
        //idiomas parametrizados
        const languageList = await axios.get('https://api-perfil.uc.r.appspot.com/parameters/languages')
        setLanList(languageList.data)
        //habilidades parametrizadas
        const skillsList = await axios.get('https://api-perfil.uc.r.appspot.com/parameters/skills')
        setSkillList(skillsList.data)
    }

    const setData = () => {
        //idiomas del alumno
        const langList = user.languages
        setLanguages(langList)
        //habilidades del alumno
        const skList = user.skills
        setSkills(skList)
        //actividades académicas
        const academicList = user.academics
        setAcademics(academicList)
        //actividades laborales
        const laborList = user.labors
        setLabors(laborList)
        //actividades independientes
        const indepList = user.independents
        setIndependents(indepList)
    }

    const updateState = async (act) => {
        switch (act) {
            case 'independent':
                const resInd = await axios.get(`https://api-perfil.uc.r.appspot.com/independents/${user.id}`, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                })
                dispatch(login({
                    ...user,
                    independents: resInd.data
                }))
                break
            case 'academic':
                const resAc = await axios.get(`https://api-perfil.uc.r.appspot.com/academics/${user.id}`, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                })
                dispatch(login({
                    ...user,
                    academics: resAc.data
                }))
                break
            case 'labor':
                const resLab = await axios.get(`https://api-perfil.uc.r.appspot.com/labors/${user.id}`, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                })
                dispatch(login({
                    ...user,
                    labors: resLab.data
                }))
                break
            case 'language':
                const resLan = await axios.get(`https://api-perfil.uc.r.appspot.com/languages/${user.id}`, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                })
                dispatch(login({
                    ...user,
                    languages: resLan.data
                }))
                break
            case 'skill':
                const resSk = await axios.get(`https://api-perfil.uc.r.appspot.com/skills/${user.id}`, {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    }
                })
                dispatch(login({
                    ...user,
                    skills: resSk.data
                }))
                break
        }
    }

    useEffect(() => {
        if (!sessionStorage.getItem("sesskey")) navigate('/login')
        fetchData()
        setData()
    }, []);

    return (
        <div className="profilePageContainer">

            <div className="profesionalFormsContainer">
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
                                {lan?.endDate &&
                                    <div className="fillForm">
                                        <label>Fecha Finalización</label>
                                        <label>{lan.endDate && new Date(lan?.endDate).toLocaleDateString("en-AU")}</label>
                                    </div>}
                                {lan?.description &&
                                    <div className="fillForm">
                                        <label>Descripción</label>
                                        <label id='activityDescription'>{lan?.description}</label>
                                    </div>}

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
                            <select name="" id="" onChange={(event) => { setCurrentAcademic({ ...currentAcademic, state: event.target.value }) }}>
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

                    <button className='plus' onClick={() => addActivity("academic")}><FontAwesomeIcon icon={faPlus} /></button>

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
                                {lan?.endDate &&
                                    <div className="fillForm">
                                        <label>Fecha Finalización</label>
                                        <label>{lan.endDate && new Date(lan?.endDate).toLocaleDateString("en-AU")}</label>
                                    </div>}
                                {lan?.description &&
                                    <div className="fillForm">
                                        <label>Descripción</label>
                                        <label id='activityDescription'>{lan?.description}</label>
                                    </div>}
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
                            <select name="" id="" onChange={(event) => { setCurrentLabor({ ...currentLabor, state: event.target.value }) }}>
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

                    <button className='plus' onClick={() => addActivity("labor")}><FontAwesomeIcon icon={faPlus} /></button>

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
                                {lan?.endDate &&
                                    <div className="fillForm">
                                        <label>Fecha Finalización</label>
                                        <label>{lan.endDate && new Date(lan?.endDate).toLocaleDateString("en-AU")}</label>
                                    </div>}
                                {lan?.description &&
                                    <div className="fillForm">
                                        <label>Descripción</label>
                                        <label id='activityDescription'>{lan?.description}</label>
                                    </div>}
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
                            <select name="" id="" onChange={(event) => { setCurrentIndependent({ ...currentIndependent, state: event.target.value }) }}>
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

                    <button className='plus' onClick={() => addActivity("independent")}><FontAwesomeIcon icon={faPlus} /></button>

                </div>


                <div className="aboutContainer">
                    <h3>Idiomas</h3>
                    {languages?.map(lan => {
                        return (
                            <div className="fillForms">
                                <div className="fillForm">
                                    <label>Idioma</label>
                                    <label>{lanList.map((l) => {
                                        if (l.id == lan.languageId) {
                                            return l.name
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
                            <select onChange={(v) => {
                                const languagesSelected = lanList.filter((l) => l.id == v.target.value)
                                const languageSelected = languagesSelected[0]
                                setCurrentLanguage({ ...currentLanguage, language: languageSelected?.name, languageId: languageSelected?.id })
                            }} id="">
                                <option value=""></option>
                                {lanList.map((l) => {
                                    return (<option value={l.id}>{l.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="fillForm">
                            <label>Nivel</label>
                            <select onChange={(v) => setCurrentLanguage({ ...currentLanguage, level: v.target.value })} id="">
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
                                        if (l.id == sk.skillId) {
                                            return l.name
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
                            <select onChange={(v) => {
                                const skillsSelected = skillList.filter((l) => l.id == v.target.value)
                                const skillSelected = skillsSelected[0]
                                setCurrentSkill({ ...currentSkill, skill: skillSelected?.name, skillId: skillSelected?.id })
                            }} id="">
                                <option value=""></option>
                                {skillList.map((l) => {
                                    return (<option value={l.id}>{l.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="fillForm">
                            <label>Puntaje</label>
                            <div className='inputRadios'>
                                <input type="radio" value="1" id='1' name='score' onChange={(e) => setCurrentSkill({ ...currentSkill, score: e.target.value })} />
                                <label for="1">1</label>
                                <input type="radio" value="2" id='2' name='score' onChange={(e) => setCurrentSkill({ ...currentSkill, score: e.target.value })} />
                                <label for="2">2</label>
                                <input type="radio" value="3" id='3' name='score' onChange={(e) => setCurrentSkill({ ...currentSkill, score: e.target.value })} />
                                <label for="3">3</label>
                                <input type="radio" value="4" id='4' name='score' onChange={(e) => setCurrentSkill({ ...currentSkill, score: e.target.value })} />
                                <label for="4">4</label>
                                <input type="radio" value="5" id='5' name='score' onChange={(e) => setCurrentSkill({ ...currentSkill, score: e.target.value })} />
                                <label for="5">5</label>
                            </div>
                        </div>

                    </div>

                    <button className='plus' onClick={() => addSkill()}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            </div >
        </div >
    )
}
export default EditProfesionalProfile