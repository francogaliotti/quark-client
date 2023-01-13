import React, { useState, useEffect } from 'react'
import { PrimaryButton } from '../../../styles/styledComponents/Buttons';
import '../../../styles/Modal.css'
import axios from 'axios';
import Swal from 'sweetalert2';

export const EditNewsModal = ({ open, onClose, fetch, update, setUpdate, current, setCurrent }) => {

    const [moodleCourses, setMoodleCourses] = useState([])
    const [currentNews, setCurrentNews] = useState(current)

    useEffect(() => {
        setCurrentNews(current)
    }, [current]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`https://api-perfil.uc.r.appspot.com/news/`)
            setMoodleCourses(res.data)
        }
        fetchData()
    }, []);

    const handleSubmit = async () => {
        try {
            if (!update) {
                const res = await axios.post(`https://api-perfil.uc.r.appspot.com/news/create`, { news: currentNews })
                Swal.fire(
                    'Añadido!',
                    'Novedad añadida.',
                    'success'
                )
            } else {
                const res = await axios.put(`https://api-perfil.uc.r.appspot.com/news/update`, { newsId: current.id, news: currentNews })
                Swal.fire(
                    'Actualizado!',
                    'Novedad actualizada.',
                    'success'
                )
                setUpdate(false)
                setCurrent({})
            }
            onClose()
            fetch()
        } catch (e) {
            console.log(e)
            Swal.fire(
                'Error!',
                e.response.data.msg,
                'error'
            )
        }
    }

    if (!open) return null;
    return (
        <div className='overlay' onClick={onClose}>
            <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                <p className="closeBtn" onClick={onClose}>X</p>
                <div className="modalCamp">
                    <label for="title">Título</label>
                    <input id='title' className='modalInput' value={currentNews?.title} onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })} />
                </div>
                <div className="modalCamp">
                    <label for="content">Contenido</label>
                    <textarea id="content" className='modalTextArea' value={currentNews?.content} onChange={(e) => setCurrentNews({ ...currentNews, content: e.target.value })} />
                </div>
                <div className="modalCamp">
                    <label for="validity">Vencimiento</label>
                    <input type="date" id='validity' className='modalInput' value={currentNews?.endDate} onChange={(e) => setCurrentNews({ ...currentNews, endDate: e.target.value })} />
                </div>
                <div className="modalCamp">
                    <label for="filter">Filtros <p>(Mantener Ctrl.)</p></label>
                    <select multiple id="filter" className='modalInput selectMultiple' onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                        setCurrentNews({ ...currentNews, courseList: selectedOptions })
                    }} >
                        {moodleCourses.map(course => {
                            return <option value={course.id}>{course.name}</option>
                        })}
                    </select>
                </div>
                <PrimaryButton id='createButton' onClick={() => handleSubmit()}>{update ? <>Actualizar</> : <>Crear</>}</PrimaryButton>
            </div>
        </div>
    )

}
