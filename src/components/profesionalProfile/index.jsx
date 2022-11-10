import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import '../../styles/ProfesionalProfile.css'

function ProfesionalProfile() {

    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user]);

    return (
        <div className="profesionalProfileContainer">
            <div className="basicInfo" id='profesionalInfo'>
                <img src="https://art.pixilart.com/7f856e195b0e64b.png" alt="" />
                <h2 className="name">{user.name}</h2>
                <div className="profesionalDescriptionContainer">
                    <h3>Descripción:</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum amet, aliquid quia perferendis
                        vel neque unde vitae recusandae sed accusamus rem. Sequi consectetur enim animi beatae
                        necessitatibus. Velit, ad possimus.</p>
                </div>
                <div className="badgeContainer">
                    <h3>Insignias:</h3>
                    <div className="badges">
                        <div className="badge">
                            <img id='badgeImg' src="https://w7.pngwing.com/pngs/799/421/png-transparent-badge-gold-badge-s-template-presentation-logo.png" alt="" />
                        </div>
                        <div className="badge">
                            <img id='badgeImg' src="https://w7.pngwing.com/pngs/938/674/png-transparent-badge-logo-red-badge-blue-label-heart.png" alt="" />
                        </div>
                        <div className="badge">
                            <img id='badgeImg' src="https://w7.pngwing.com/pngs/799/421/png-transparent-badge-gold-badge-s-template-presentation-logo.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfesionalProfile