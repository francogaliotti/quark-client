import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../../features/userSlice';
import { slide as Menu } from 'react-burger-menu'
import './Navbar.css'
import { useMediaQuery } from 'react-responsive';
import menuStyle from './menuStyle'


function Navbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMovile = useMediaQuery({ maxWidth: "860px" })

  if (isMovile) return (
    <Menu right styles={menuStyle}>
      <div>
        {user ? <ul className='verticalList' id='verticalResponsive'>
          <li><a onClick={() => navigate('/')}>Inicio</a></li>
          <li><a onClick={() => navigate('/profile')}>Mi Perfil</a></li>
          <li><a href="#">Mis Cursos</a></li>
          <li><a href="#">About</a></li>
          <li><a href="/login" onClick={() => dispatch(logout())}>Logout</a></li>
        </ul> :
          <ul className='verticalList' id='verticalResponsive'>
            <li><a onClick={() => navigate('/registerDev')}>Developer</a></li>
            <li><a onClick={() => navigate('/registerCom')}>Empresa</a></li>
            <li><a href="/login">Login</a></li>
          </ul>}
      </div>
    </Menu>
  )
  return (
    <div className="navbarContainer">
      {user ? <ul>
        <li><a href="/login" onClick={() => dispatch(logout())}>Logout</a></li>
      </ul> :
        <ul>
          <li><a onClick={() => navigate('/registerDev')}>Developer</a></li>
          <li><a onClick={() => navigate('/registerCom')}>Empresa</a></li>
          <li><a href="/login">Login</a></li>
        </ul>}
    </div>
  )
}

export default Navbar