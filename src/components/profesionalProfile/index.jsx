import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import '../../styles/ProfesionalProfile.css'

function ProfesionalProfile() {

    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("sesskey")) navigate('/login')
    }, []);

    return (
        <div className="profesionalProfileContainer">
            <div className="basicInfo" id='profesionalInfo'>
                <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
                <h2 className="name">{user?.username}</h2>
                <div className="profesionalDescriptionContainer">
                    <h3>Descripción:</h3>
                    <p>{user?.description}</p>
                </div>
                <div className="badgeContainer">
                    <h3>Insignias:</h3>
                    <div className="badges">
                        {
                            user?.badgesList.map((b) => {
                                return (<div className="badge">
                                    <img id='badgeImg' src={b.badgeUrl} alt="" />
                                </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfesionalProfile