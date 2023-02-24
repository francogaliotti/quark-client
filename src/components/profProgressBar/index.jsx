import ProgressBar from '@ramonak/react-progress-bar';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
//import '../../styles/ProgressBar.css'

function ProfProgressBar(props) {

    const user = useSelector(selectUser);
    const [porcentaje, setPorcentaje] = useState(0);

    const handlePorcentajeProfile = (type) => {
        let counter = 0
        if (type) {
            if (user?.academicActivities.length != 0) {
                counter += 16.7
            }
            if (user?.laborActivities.length != 0) {
                counter += 16.7
            }
            if (user?.independentActivities.length != 0) {
                counter += 16.7
            }
            if (user?.languages?.length != 0) {
                counter += 16.7
            }
            if (user?.skills.length != 0) {
                counter += 16.7
            }
            if (user?.userBasicDatum.nickname?.length != 0) {
                counter += 16.7
            }
        } else {
            if (user?.userBasicDatum.biography?.length != 0) {
                counter += 12.5
            }
            if (user?.userBasicDatum.birthdate?.length != (0 || undefined)) {
                counter += 12.5
            }
            if (user?.moodleUserData.firstname?.length != 0) {
                counter += 12.5
            }
            if (user?.moodleUserData.lastname?.length != 0) {
                counter += 12.5
            }
            if (user?.moodleUserData.email?.length != 0) {
                counter += 12.5
            }
            if (user?.moodleUserData.country?.length != 0) {
                counter += 12.5
            }
            if (user?.moodleUserData.city?.length != 0) {
                counter += 12.5
            }
            if (user?.moodleUserData.phone?.length != 0) {
                counter += 12.5
            }
        }
        setPorcentaje(counter)
    }

    useEffect(() => {
        if (props.type == "profesional") {
            handlePorcentajeProfile(1)
        } else {
            handlePorcentajeProfile(0)
        }
    }, [user])

    return (
        <div className='progressBarContainer'>
            <ProgressBar completed={Math.round(porcentaje)} className="wrapper"
                barContainerClassName="container"
                bgColor='rgb(24, 27, 32)'
                labelClassName="label"
                labelAlignment='center' />
            <p>Tu perfil{props.type == "profesional" && <> profesional</>} está un {Math.round(porcentaje)}% completo</p>
        </div>
    )
}

export default ProfProgressBar