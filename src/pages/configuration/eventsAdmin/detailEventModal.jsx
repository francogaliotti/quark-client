import React from 'react'
import '../../../styles/Modal.css'

const DetailEventModal = ({ open, onClose, current, setCurrent }) => {

  const closeModal = () => {
    onClose()
    setCurrent({})
  }

  if (!open) return null;
  return (
    <div className='overlay' onClick={closeModal}>
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        <p className="closeBtn" onClick={closeModal}>X</p>
        <div className="modalCamp">
          <label for="title">Titulo: {current?.title}</label>
        </div>
        <div className="modalCamp">
          <label for="eventDate" >Fecha: {new Date(current?.eventDate).toLocaleDateString("en-AU")}</label>
        </div>
        <div className="modalCamp">
          <label for="link">Link: {current?.link}</label>
        </div>
        <div className="modalCamp">
          <label for="visibility">Visibilidad: {current?.visibility == 0 ? <>Visible</> : <>Oculto</>}</label>
        </div>
        <div className="modalCamp">
          <label for="isSaved">Guardado: {current?.isSaved == 0 ? <>No</> : <>Si</>}</label>
        </div>
        <div className="modalCamp">
          <label for="descripcion">Descripción: {current?.description}</label>
        </div>
        {/*<div className="modalCamp">
          <label for="tagList">Etiquetas</label>
          <p>{current?.eventTags.map(t=>{
            return
          })}</p>
          <select id="tagList" className='modalInput selectMultiple' multiple onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
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
        </div>*/}
      </div>
    </div>
  )
}

export default DetailEventModal