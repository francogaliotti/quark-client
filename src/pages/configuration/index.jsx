import React, { useEffect } from 'react'
import { PrimaryButton } from '../../styles/styledComponents/Buttons'
import '../../styles/Configuration.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';

function Configuration() {

    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user){ 
            navigate('/login')
            if (user.profile.role != 1){
                navigate('/')
            }
        }
    }, [user]);

  return (
    <div className='configContainer'>
        <h1>Administración del Sitio</h1>
        <div className="basicInfo" id='configButtonContainer'>
            <PrimaryButton onClick={()=>navigate('/config/events')}>Administrar eventos</PrimaryButton>
            <PrimaryButton onClick={()=>navigate('/config/news')}>Administrar novedades</PrimaryButton>
            <PrimaryButton>Opcion 3</PrimaryButton>
            <PrimaryButton>Opcion 4</PrimaryButton>
            <PrimaryButton>Opcion 5</PrimaryButton>
        </div>
    </div>
  )
}

export default Configuration