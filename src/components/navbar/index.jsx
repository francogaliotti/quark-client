import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/userSlice';
import { slide as Menu } from 'react-burger-menu'
import './Navbar.css'
import { useMediaQuery } from 'react-responsive';
import menuStyle from './menuStyle'


function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMovile = useMediaQuery({ maxWidth: "860px" })

  if (isMovile) return (
    <Menu right styles={menuStyle}>
      <div>
        <ul className='verticalList' id='verticalResponsive'>
          <li><a onClick={() => navigate('/')}>Home</a></li>
          <li><a onClick={() => navigate('/profile')}>Mi Perfil</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">About</a></li>
          <li><a href="/login" onClick={() => dispatch(logout())}>Logout</a></li>
        </ul>
      </div>
    </Menu>
  )
  return (
    <div className="navbarContainer">
      <ul>
        <li><a href="/login" onClick={() => dispatch(logout())}>Logout</a></li>
      </ul>
    </div>
  )
}

export default Navbar