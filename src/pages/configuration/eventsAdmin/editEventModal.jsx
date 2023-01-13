import React, { useEffect, useState } from 'react'
import { PrimaryButton } from '../../../styles/styledComponents/Buttons';
import '../../../styles/Modal.css'
import Swal from 'sweetalert2';
import axios from 'axios';

const EditEventModal = ({ open, onClose, fetch, update, setUpdate, current, setCurrent }) => {

  const [actualEvent, setActualEvent] = useState(current);
  const [tagList, setTagList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://api-perfil.uc.r.appspot.com/tags/`)
      setTagList(res.data)
    }
    fetchData()
  }, []);

  useEffect(() => {
    setActualEvent(current)
  }, [current]);

  const handleSubmit = async () => {
    try {
      if (!update) {
        console.log({ event: actualEvent })
        const res = await axios.post(`https://api-perfil.uc.r.appspot.com/events/create`, { event: actualEvent })
        Swal.fire(
          'Añadido!',
          'Evento añadido.',
          'success'
        )
      } else {
        const res = await axios.put(`https://api-perfil.uc.r.appspot.com/events/update`, { eventid: current.id, event: actualEvent })
        Swal.fire(
          'Actualizado!',
          'Evento actualizado.',
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
          <label for="title">Titulo</label>
          <input id="title" className='modalInput' value={actualEvent?.title} onChange={(e) => setActualEvent({ ...actualEvent, title: e.target.value })} />
        </div>
        <div className="modalCamp">
          <label for="eventDate" >Fecha</label>
          <input id="eventDate" type='date' className='modalInput' value={actualEvent?.eventDate} onChange={(e) => setActualEvent({ ...actualEvent, eventDate: e.target.value })} />
        </div>
        <div className="modalCamp">
          <label for="link">Link</label>
          <input id="link" className='modalInput' value={actualEvent?.link} onChange={(e) => setActualEvent({ ...actualEvent, link: e.target.value })} />
        </div>
        <div className="modalCamp">
          <label for="visibility">Visibilidad</label>
          <select id="visibility" className='modalInput' value={actualEvent?.visibility} onChange={(e) => setActualEvent({ ...actualEvent, visibility: Number(e.target.value) })} >
            <option value="0">Visible</option>
            <option value="1">Oculto</option>
          </select>
        </div>
        <div className="modalCamp">
          <label for="isSaved">Guardado</label>
          <select id="isSaved" className='modalInput' value={actualEvent?.isSaved} onChange={(e) => setActualEvent({ ...actualEvent, isSaved: Number(e.target.value) })} >
            <option value="0">No</option>
            <option value="1">Si</option>
          </select>
        </div>
        <div className="modalCamp">
          <label for="descripcion">Descripción</label>
          <textarea id="descripcion" className='modalTextArea' value={actualEvent?.description} onChange={(e) => setActualEvent({ ...actualEvent, description: e.target.value })} />
        </div>
        <div className="modalCamp">
          <label for="tagList">Etiquetas</label>
          <select id="tagList" className='modalInput selectMultiple' multiple onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions).map(option => Number(option.value));
            setActualEvent({ ...actualEvent, tagList: selectedOptions })
          }}>
            {
              tagList.map(t => {
                return (
                  <option value={t.id}>{t.name}</option>
                )
              })
            }
          </select>
        </div>

        <PrimaryButton id='createButton' onClick={() => handleSubmit()}>{update ? <>Actualizar</> : <>Crear</>}</PrimaryButton>
      </div>
    </div>
  )
}

export default EditEventModal