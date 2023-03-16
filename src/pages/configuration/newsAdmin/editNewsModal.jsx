import React, { useState, useEffect } from 'react'
import { PrimaryButton } from '../../../styles/styledComponents/Buttons';
import '../../../styles/Modal.css'
import { getPublic, postPrivate,  putPrivate } from '../../../services/apiService';
import Alert from '../../../services/alertService';


export const EditNewsModal = ({ open, onClose, fetch, update, setUpdate, current, setCurrent }) => {

    const [moodleCourses, setMoodleCourses] = useState([])
    const [currentNews, setCurrentNews] = useState(current)

    useEffect(() => {
        setCurrentNews(current)
    }, [current]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getPublic(`/news`)
            setMoodleCourses(res.data)
        }
        fetchData()
    }, []);

    const handleSubmit = async () => {
        try {
            if (!update) {
                if(currentNews?.courseList){
                    
                    
                }else{
                    currentNews.courseList = []
                    console.log(currentNews)
                }
                const res = await postPrivate(`/news/create`, { news: currentNews })
                Alert.success({ title: 'Añadida!', message: 'Novedad añadida' })
            } else {
                const res = await putPrivate(`/news/update`, { newsId: current.id, news: currentNews })
                Alert.success({ title: 'Actualizada!', message: 'Novedad actualizada' })
                setUpdate(false)
                setCurrent({})
            }
            onClose()
            fetch()
        } catch (e) {
            console.log(e)
            Alert.error({ title: 'Error!', message: e.response.data.msg })
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
