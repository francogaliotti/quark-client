import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import './VerticalNavbar.css'

function VerticalNavbar() {

    const isMovile = useMediaQuery({ maxWidth: "650px" })
    const navigate = useNavigate()


    if (!isMovile)
        return (<div className="verticalNavbarContainer">
            <ul className='verticalList'>
                <li><a onClick={()=>navigate('/')}>Home</a></li>
                <li><a onClick={()=>navigate('/profile')}>Mi Perfil</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </div>)

}

export default VerticalNavbar