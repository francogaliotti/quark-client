import React, { useState } from 'react'
import { PrimaryButton } from '../../../styles/styledComponents/Buttons';
import '../../../styles/Modal.css'

const EditEventModal = ({ open, onClose }) => {

  const [actualEvent, setActualEvent] = useState({
    title: "",
    description: "",
    eventDate: "",
    link: "",
    state: 0,
    visibility: 0
  });

  if (!open) return null;
  return (
    <div className='overlay' onClick={onClose}>
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        <p className="closeBtn" onClick={onClose}>X</p>
        <div className="modalCamp">
          <label for="title">Titulo</label>
          <input id="title" className='modalInput' />
        </div>
        <div className="modalCamp">
          <label for="date" >Fecha</label>
          <input id="date" type='date' className='modalInput' />
        </div>
        <div className="modalCamp">
          <label for="link">Link</label>
          <input id="link" className='modalInput' />
        </div>
        <div className="modalCamp">
          <label for="visibility">Visibilidad</label>
          <select id="visibility" className='modalInput' >
            <option value="0">Visible</option>
            <option value="1">Oculto</option>
          </select>
        </div>
        <div className="modalCamp">
          <label for="descripcion">Descripción</label>
          <textarea id="descripcion" className='modalTextArea' />
        </div>

        <PrimaryButton id='createButton'>Crear</PrimaryButton>
      </div>
    </div>
  )
}

export default EditEventModal