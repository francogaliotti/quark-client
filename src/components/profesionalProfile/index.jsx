import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import '../../styles/ProfesionalProfile.css'
import { PrimaryButton } from '../../styles/styledComponents/Buttons';
import ProgressBar from "@ramonak/react-progress-bar";

function ProfesionalProfile() {

    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [porcentaje, setPorcentaje] = useState(0);
    const [profData, setProfData] = useState()

    const fetchData = async () => {
        const res = await axios.get(`https://api-perfil.uc.r.appspot.com/user/getAllInfo/${user.id}`, {
            headers: {
                authorization: sessionStorage.getItem("token")
            }
        })
        setProfData(res.data)
    }

    const handlePorcentajeProfile = () => {
        let counter = 0
        console.log(profData?.ActividadesAcademicas.length)
        if (profData?.ActividadesAcademicas.length != 0) {
            counter += 16.7
        }
        if (profData?.ActividadesLaborales.length != 0) {
            counter += 16.7
        }
        if (profData?.ActividadesIndependientes.length != 0) {
            counter += 16.7
        }
        if (profData?.idiomas.length != 0) {
            counter += 16.7
        }
        if (profData?.habilidades.length != 0) {
            counter += 16.7
        }
        if (profData?.biography.length != 0) {
            counter += 16.7
        }
        console.log(counter)
        setPorcentaje(counter)
    }

    useEffect(() => {
        if (!sessionStorage.getItem("sesskey")) navigate('/login')
        fetchData()

    }, []);

    useEffect(() => {
        //handlePorcentajeProfile()
        console.log(profData)
        console.log("hola")
        handlePorcentajeProfile()
    }, [profData])

    return (
        <div className="profesionalProfileContainer">
            <div className="basicInfo" id='profesionalInfo'>
                <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
                <h2 className="name">{user?.username}</h2>

                <div className="profesionalDescriptionContainer">
                    <ProgressBar completed={Math.round(porcentaje)} className="progressBar" />
                    <p>Tu perfil está un {Math.round(porcentaje)}% completo</p>
                    <h3>Biografía:</h3>
                    <p>{profData?.biography}</p>
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
                <PrimaryButton onClick={() => navigate('/profesionalProfile/edit')}>Editar</PrimaryButton>
            </div>
        </div>
    )
}

export default ProfesionalProfile