import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import '../../styles/ProfesionalProfile.css'
import { PrimaryButton } from '../../styles/styledComponents/Buttons';
import ProgressBar from "@ramonak/react-progress-bar";
import ProfProgressBar from '../profProgressBar';

function ProfesionalProfile() {

    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login')
    }, []);

    return (
        <div className="profesionalProfileContainer">
            <div className="basicInfo" id='profesionalInfo'>
                <img src={user?.userBasicDatum.imgUrl} alt="" />
                <h2 className="name">{user?.userBasicDatum.nickname}</h2>

                <div className="profesionalDescriptionContainer">
                    <ProfProgressBar type='profesional'/>
                    <h3>Biografía:</h3>
                    <p>{user?.userBasicDatum.biography}</p>
                </div>
                <div className="badgeContainer">
                    <h3>Insignias:</h3>
                    <div className="badges">
                        {
                            user?.moodleUserData.badgesList.map((b) => {
                                return (<div className="badge">
                                    <img id='badgeImg' src={b.badgeUrl} alt="" />
                                </div>)
                            })
                        }
                    </div>
                </div>
                <div className="aboutContainer" id='ppAbout'>
                    <h3>Actividades Académicas:</h3>
                    {user.academicActivities?.map(lan => {
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
                            </div>

                        )
                    })}
                </div>
                <div className="aboutContainer" id='ppAbout'>
                    <h3>Actividades Laborales:</h3>
                    {user.laborActivities?.map(lan => {
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
                            </div>

                        )
                    })}
                </div>
                <div className="aboutContainer" id='ppAbout'>
                    <h3>Actividades Independientes:</h3>
                    {user.independentActivities?.map(lan => {
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
                            </div>

                        )
                    })}
                </div>
                <div className="aboutContainer" id='ppAbout'>
                    <h3>Idiomas:</h3>
                    {user.studentLanguages?.map(lan => {
                        return (
                            <div className="fillForms">
                                <div className="fillForm">
                                    <label>Idioma</label>
                                    <label>{lan?.language.name}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Nivel</label>
                                    <label>{lan?.level}</label>
                                </div>
                                
                            </div>
                        )
                    })}
                </div>
                <div className="aboutContainer" id='ppAbout'>
                    <h3>Habilidades:</h3>
                    {user.studentSkills?.map(sk => {
                        return (
                            <div className="fillForms">
                                <div className="fillForm">
                                    <label>Habilidad</label>
                                    <label>{sk?.skill.name}</label>
                                </div>
                                <div className="fillForm">
                                    <label>Puntaje</label>
                                    <label>{sk?.score}</label>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <PrimaryButton onClick={() => navigate('/profesionalProfile/edit')}>Editar</PrimaryButton>
            </div>
        </div>
    )
}

export default ProfesionalProfile