import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../../features/userSlice';
import { slide as Menu } from 'react-burger-menu'
import '../../styles/Navbar.css'
import { useMediaQuery } from 'react-responsive';
import menuStyle from './menuStyle'
import quarkLogo from '../../images/quark-logo.png'


function Navbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMovile = useMediaQuery({ maxWidth: "860px" })

  const handleLogout = () => {

    //window.location.href = "http://localhost/moodle/login/logout.php"
    dispatch(logout())
  }

  if (isMovile) return (
    <Menu right styles={menuStyle}>
      <div>
        {user ? <ul className='verticalList' id='verticalResponsive'>
          <li><a onClick={() => navigate('/')}>Inicio</a></li>
          <li><a onClick={() => navigate('/profile')}>Mi Perfil</a></li>
          <li><a onClick={() => navigate('/profesionalProfile')}>Perfil Profesional</a></li>
          <li><a onClick={() => navigate('/myCourses')}>Mi Aprendizaje</a></li>
          <li><a onClick={() => navigate('/events')}>Eventos</a></li>
          {user.profile.role == 1 &&
                    <li><a onClick={() => navigate('/config')}>Administración del Sitio</a></li>
                }
          <li><a onClick={() => handleLogout()}>Logout</a></li>
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