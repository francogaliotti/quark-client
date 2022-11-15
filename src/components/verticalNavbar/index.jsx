import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import '../../styles/VerticalNavbar.css'

function VerticalNavbar() {

    const isMovile = useMediaQuery({ maxWidth: "860px" })
    const navigate = useNavigate()


    if (!isMovile)
        return (<div className="verticalNavbarContainer">
            <ul className='verticalList'>
                <li><a onClick={()=>navigate('/')}>Inicio</a></li>
                <li><a onClick={()=>navigate('/profile')}>Mi Perfil</a></li>
                <li><a onClick={()=>navigate('/profesionalProfile')}>Perfil Profesional</a></li>
                <li><a onClick={()=>navigate('/myCourses')}>Mis Cursos</a></li>
                <li><a href="#">Eventos</a></li>
            </ul>
        </div>)

}

export default VerticalNavbar