import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../../features/userSlice';
import { slide as Menu } from 'react-burger-menu'
import '../../styles/Navbar.css'
import { useMediaQuery } from 'react-responsive';
import menuStyle from './menuStyle'
import quarkLogo from '../../images/quark-logo.png'
import { useState } from 'react';

function Navbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMovile = useMediaQuery({ maxWidth: "860px" })
  const [isMenuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {

    //window.location.href = "http://localhost/moodle/login/logout.php"
    dispatch(logout())
  }

  if (isMovile) return (
      <Menu right styles={menuStyle} isOpen={isMenuOpen} onOpen={() => setMenuOpen(true)} onClose={() => setMenuOpen(false)} >
        <div>
          {user ? <ul className='verticalList' id='verticalResponsive'>
            <li><a onClick={() => {
              navigate('/')
              setMenuOpen(!isMenuOpen)
            }}>Inicio</a></li>
            <li><a onClick={() => {
              navigate('/profile')
              setMenuOpen(!isMenuOpen)
            }}>Mi Perfil</a></li>
            <li><a onClick={() => {
              navigate('/profesionalProfile')
              setMenuOpen(!isMenuOpen)
            }}>Perfil Profesional</a></li>
            <li><a onClick={() => {
              navigate('/myCourses')
              setMenuOpen(!isMenuOpen)
            }}>Mi Aprendizaje</a></li>
            <li><a onClick={() => {
              navigate('/events')
              setMenuOpen(!isMenuOpen)
            }}>Eventos</a></li>
            {user.role == 1 &&
              <li><a onClick={() => {
                navigate('/config')
                setMenuOpen(!isMenuOpen)
              }}>Administración del Sitio</a></li>
            }
            <li><a onClick={() => handleLogout()}>Logout</a></li>
          </ul> :
            <ul className='verticalList' id='verticalResponsive'>
              <li><a onClick={() => {
                navigate('/registerDev')
                setMenuOpen(!isMenuOpen)
              }}>Developer</a></li>
              <li><a onClick={() => {
                navigate('/registerCom')
                setMenuOpen(!isMenuOpen)
              }}>Empresa</a></li>
              <li><a href="/login">Login</a></li>
            </ul>}
        </div>
      </Menu>
  )
  return (
    <div className="navbarContainer">
      <div className="logoContainer" onClick={() => navigate('/')}>
        <img src={quarkLogo} alt="" />
      </div>
      {user ? <ul>
        <li><a onClick={() => handleLogout()}>Logout</a></li>
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