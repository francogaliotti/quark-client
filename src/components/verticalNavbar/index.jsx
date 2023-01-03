import React from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../../features/userSlice'
import '../../styles/VerticalNavbar.css'

function VerticalNavbar() {

    const isMovile = useMediaQuery({ maxWidth: "860px" })
    const navigate = useNavigate()
    const user = useSelector(selectUser);


    if (!isMovile)
        return (<div className="verticalNavbarContainer">
            <ul className='verticalList'>
                <li><a onClick={() => navigate('/')}>Inicio</a></li>
                <li><a onClick={() => navigate('/profile')}>Mi Perfil</a></li>
                <li><a onClick={() => navigate('/profesionalProfile')}>Perfil Profesional</a></li>
                <li><a onClick={() => navigate('/myCourses')}>Mi Aprendizaje</a></li>
                <li><a onClick={() => navigate('/events')}>Eventos</a></li>
                {user.profile.role == 1 &&
                    <li><a onClick={() => navigate('/config')}>Configuración</a></li>
                }
            </ul>
        </div>)

}

export default VerticalNavbar