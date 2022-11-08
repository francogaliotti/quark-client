import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../../components/styledComponents/Buttons';
import { selectUser } from '../../features/userSlice';
import './ProfilePage.css'

function ProfilePage() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user]);

    return (
        <div className="profilePageContainer">
            <div className="leftContainer">
                <div className="basicInfo">
                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
                    <h2 className="name">{user.name}</h2>
                    <h3 className="email">user@mail.com</h3>
                </div>
                <div className="descriptionContainer">
                    <h3>Añade tu CV</h3>
                    <PrimaryButton onClick={() => ref.current.click()}>Añadir CV</PrimaryButton>
                    <input ref={ref} type='file' id="getFile" />
                </div>
                <div className="descriptionContainer">
                    <h3>Mi Descripción</h3>
                    <textarea></textarea>
                </div>
            </div>
            <div className="rightContainer">
                <div className="aboutContainer">
                    <h3>Sobre mí</h3>
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Nombre</label>
                            <input type="text" />
                        </div>
                        <div className="fillForm">
                            <label>Apellido</label>
                            <input type="text" />
                        </div>
                        <div className="fillForm">
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
                        </div>
                        <div className="fillForm">
                            <label>Codigo de Pais</label>
                            <input type="text" />
                        </div>
                        <div className="fillForm">
                            <label>Celular</label>
                            <input type="text" />
                        </div>
                        <div className="fillForm">
                            <label>Pais</label>
                            <select name="" id=""></select>
                        </div>
                        <div className="fillForm">
                            <label>Provincia</label>
                            <select name="" id=""></select>
                        </div>
                        <div className="fillForm">
                            <label>Localidad</label>
                            <select name="" id=""></select>
                        </div>
                    </div>

                </div>


                <div className="aboutContainer">
                    <h3>Formación</h3>
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Institución</label>
                            <input type="text" />
                        </div>
                        <div className="fillForm">
                            <label>Título</label>
                            <input type="text" />
                        </div>
                        <div className="fillForm">
                            <label>Área de Estudio</label>
                            <select name="" id=""></select>
                        </div>
                        <div className="fillForm">
                            <label>Estado</label>
                            <select name="" id=""></select>
                        </div>
                        <div className="fillForm">
                            <label>Fecha de Inicio</label>
                            <input type="date" />
                        </div>
                        <div className="fillForm">
                            <label>Fecha Finalización</label>
                            <input type="date" />
                        </div>
                    </div>



                </div>
                <div className="aboutContainer">
                    <h3>Idiomas</h3>
                    <div className="fillForms">
                        <div className="fillForm">
                            <label>Idioma</label>
                            <select name="" id=""></select>
                        </div>
                        <div className="fillForm">
                            <label>Nivel</label>
                            <select name="" id=""></select>
                        </div>

                    </div>
                </div>
                <PrimaryButton>Guardar</PrimaryButton>
            </div>
        </div>
    )
}

export default ProfilePage