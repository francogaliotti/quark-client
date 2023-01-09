import { faCircleInfo, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { PrimaryButton } from '../../../styles/styledComponents/Buttons';
import EditEventModal from './editEventModal';

export const EventsAdmin = () => {

    const [openModal, setOpenModal] = useState(false);
    const [eventList, setEventList] = useState([])
    const [update, setUpdate] = useState(false);
    const [current, setCurrent] = useState({})

    const fetchData = async () => {
        const res = await axios.get(`https://api-perfil.uc.r.appspot.com/events/getAllEvents`)
        setEventList(res.data)
    }

    const openForUpdate = (n) => {
        setCurrent(n)
        setOpenModal(true)
        setUpdate(true)
    }

    const handleDelete = async (n) => {
        Swal.fire({
            title: 'Deseas eliminar este evento?',
            text: "Esta acción es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/events/delete/${n.id}`)
                Swal.fire(
                    'Eliminado!',
                    'Novedad eliminada.',
                    'success'
                )
                fetchData()
            }
        })
    }

    useEffect(() => {

        fetchData()
    }, []);

    useEffect(() => {
        if (!openModal) {
            setCurrent({})
            setUpdate(false)
        }
    }, [openModal]);

    return (
        <div className='crudAdminContainer'>
            <EditEventModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                fetch={fetchData}
                update={update}
                setUpdate={setUpdate}
                current={current}
                setCurrent={setCurrent} />
            <PrimaryButton onClick={() => setOpenModal(true)}>
                Crear Evento
            </PrimaryButton>

            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Fecha</th>
                            <th>Enlace</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventList.map(n => (
                            <tr key={n.id}>
                                <td>{n.title}</td>
                                <td>{new Date(n.eventDate).toLocaleDateString("en-AU")}</td>
                                <td><a href={n.link}>{n.link}</a></td>
                                <td id='crudButtons'>
                                    <button className='plus' onClick={() => openForUpdate(n)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                    <button className='plus' onClick={() => handleDelete(n)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                    <button className='plus'><FontAwesomeIcon icon={faCircleInfo} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
