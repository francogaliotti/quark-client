import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../styles/styledComponents/Buttons';
import { selectUser } from '../../features/userSlice';
import '../../styles/ProfilePage.css'
import { Countries } from '../../jsons/countries';


function ProfilePage() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const ref = useRef(null);

    const [currentLanguage, setCurrentLanguage] = useState()
    const [languages, setLanguages] = useState([]);
    const [currentAcademic, setCurrentAcademic] = useState()
    const [academics, setAcademics] = useState([])
    const [currentLabor, setCurrentLabor] = useState()
    const [labors, setLabors] = useState([])
    const [currentIndependent, setCurrentIndependent] = useState()
    const [independents, setIndependents] = useState([])

    const addLanguage = () => {
        if (currentLanguage && currentLanguage.language && currentLanguage.level) {
            var exist = false
            languages.map((l) => {
                if (l.language === currentLanguage.language) {
                    exist = true
                }
            })
            if (!exist) {
                setLanguages([...languages, currentLanguage])
            }
        }
    }

    const addAcademic = () => {
        if (currentAcademic && currentAcademic.institution && currentAcademic.title) {
            setAcademics([...academics, currentAcademic])
        }
    }

    const addLabor = () => {
        if (currentLabor && currentLabor.company && currentLabor.title) {
            setLabors([...labors, currentLabor])
        }
    }

    const addIndependent = () => {
        if (currentIndependent && currentIndependent.title) {
            setIndependents([...independents, currentIndependent])
        }
    }



    useEffect(() => {
        if (!user) navigate('/login')

    }, [user]);

    return (
        <div className="profilePageContainer">
            <div className="leftContainer">
                <div className="basicInfo">
                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
                    <h2 className="name">{user.username}</h2>
                </div>
                <div className="descriptionContainer">
                    <h3>Añade tu CV</h3>
                    <PrimaryButton onClick={() => ref.current.click()}>Añadir CV</PrimaryButton>
                    <input ref={ref} type='file' id="getFile" />
                </div>
                <div className="descriptionContainer">
                    <h3>Mi Descripción</h3>
                    <textarea value={user.description}></textarea>
                </div>
            </div>
            <div className="rightContainer">
                <div className="aboutContainer">
                    <h3>Sobre mí</h3>
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Nombre</label>
                            <input type="text" value={user?.firstname} />
                        </div>
                        <div className="fillForm">
                            <label>Apellido</label>
                            <input type="text" value={user?.lastname} />
                        </div>
                        <div className="fillForm">
                            <label>Email</label>
                            <input type="text" value={user?.email} />
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
                            <input type="text" value={user?.phone} />
                        </div>
                        <div className="fillForm">
                            <label>Pais</label>
                            <select name="" id="" value={user?.country}>
                                <option value=""></option>
                                {Countries.map((c) => {
                                    return <option value={c?.iso2}>{c?.nombre}</option>
                                })}
                            </select>
                        </div>
                        <div className="fillForm">
                            <label>Ciudad</label>
                            <input type="text" value={user?.city} />
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
                                    <label>{lan?.beginDate}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Fecha Finalización</label>
                                    <label>{lan?.endDate}</label>
                                </div>
                                <button className='plus' onClick={() => setAcademics(academics.filter(l => l !== lan))}>-</button>
                            </div>

                        )
                    })}
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Institución</label>
                            <input type="text" onChange={(event) => { setCurrentAcademic({ ...currentAcademic, institution: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Título</label>
                            <input type="text" onChange={(event) => { setCurrentAcademic({ ...currentAcademic, title: event.target.value }) }} />
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
                            <input type="date" onChange={(event) => { setCurrentAcademic({ ...currentAcademic, beginDate: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Fecha Finalización</label>
                            <input type="date" onChange={(event) => { setCurrentAcademic({ ...currentAcademic, endDate: event.target.value }) }} />
                        </div>

                    </div>

                    <button className='plus' onClick={() => addAcademic()}>+</button>

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
                                    <label>{lan?.beginDate}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Fecha Finalización</label>
                                    <label>{lan?.endDate}</label>
                                </div>
                                <button className='plus' onClick={() => setLabors(labors.filter(l => l !== lan))}>-</button>
                            </div>

                        )
                    })}
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Empresa</label>
                            <input type="text" onChange={(event) => { setCurrentLabor({ ...currentLabor, company: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Título</label>
                            <input type="text" onChange={(event) => { setCurrentLabor({ ...currentLabor, title: event.target.value }) }} />
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
                            <input type="date" onChange={(event) => { setCurrentLabor({ ...currentLabor, beginDate: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Fecha Finalización</label>
                            <input type="date" onChange={(event) => { setCurrentLabor({ ...currentLabor, endDate: event.target.value }) }} />
                        </div>

                    </div>

                    <button className='plus' onClick={() => addLabor()}>+</button>

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
                                    <label>{lan?.beginDate}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Fecha Finalización</label>
                                    <label>{lan?.endDate}</label>
                                </div>
                                <button className='plus' onClick={() => setIndependents(independents.filter(l => l !== lan))}>-</button>
                            </div>

                        )
                    })}
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Título</label>
                            <input type="text" onChange={(event) => { setCurrentIndependent({ ...currentIndependent, title: event.target.value }) }} />
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
                            <input type="date" onChange={(event) => { setCurrentIndependent({ ...currentIndependent, beginDate: event.target.value }) }} />
                        </div>
                        <div className="fillForm">
                            <label>Fecha Finalización</label>
                            <input type="date" onChange={(event) => { setCurrentIndependent({ ...currentIndependent, endDate: event.target.value }) }} />
                        </div>

                    </div>

                    <button className='plus' onClick={() => addIndependent()}>+</button>

                </div>


                <div className="aboutContainer">
                    <h3>Idiomas</h3>
                    {languages?.map(lan => {
                        return (
                            <div className="fillForms">

                                <div className="fillForm">
                                    <label>Idioma</label>
                                    <label >{lan?.language}</label>

                                </div>
                                <div className="fillForm">
                                    <label>Nivel</label>
                                    <label>{lan?.level}</label>
                                </div>
                                <button className='plus' onClick={() => setLanguages(languages.filter(l => l !== lan))}>-</button>
                            </div>
                        )
                    })}
                    <div className="fillForms">

                        <div className="fillForm">
                            <label>Idioma</label>
                            <select onClick={(v) => setCurrentLanguage({ ...currentLanguage, language: v.target.value })} id="">
                                <option value=""></option>
                                <option value="Ingles">Ingles</option>
                                <option value="Español">Español</option>
                                <option value="Portugues">Portugues</option>
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

                    <button className='plus' onClick={() => addLanguage()}>+</button>
                </div>
                <PrimaryButton>Guardar</PrimaryButton>
            </div >
        </div >
    )
}


export default ProfilePage