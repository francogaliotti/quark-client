import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import './ProfilePage.css'

function ProfilePage() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user]);

    return (
        <div className="profilePageContainer">
            <div className="leftContainer">
                <div className="basicInfo">
                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
                    <h2 className="name">Nombre del usuario</h2>
                    <h3 className="email">user@mail.com</h3>
                </div>
                <div className="descriptionContainer">
                    <h3>Mi Descripción</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt asperiores id natus ad enim voluptatem, et, quibusdam ab incidunt quis quia aliquid fuga praesentium reprehenderit nihil, voluptatum in laudantium minima!</p>
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
                            <input type="text" />
                        </div>
                        <div className="fillForm">
                            <label>Fecha de Nacimiento</label>
                            <input type="text" />
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
                            <input type="text" />
                        </div>
                        <div className="fillForm">
                            <label>Provincia</label>
                            <input type="text" />
                        </div>
                        <div className="fillForm">
                            <label>Localidad</label>
                            <input type="text" />
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
                            <input type="text" />
                        </div>
                        <div className="fillForm">
                            <label>Estado</label>
                            <input type="text" />
                        </div>
                        <div className="fillForm">
                            <label>Fecha de Inicio</label>
                            <input type="text" />
                        </div>
                        <div className="fillForm">
                            <label>Fecha de Finalización</label>
                            <input type="text" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfilePage