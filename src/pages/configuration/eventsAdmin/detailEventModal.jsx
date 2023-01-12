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
          <label for="title">Titulo</label>
          <p>{current?.title}</p>
        </div>
        <div className="modalCamp">
          <label for="eventDate" >Fecha</label>
          <p>{new Date(current?.eventDate).toLocaleDateString("en-AU")}</p>
        </div>
        <div className="modalCamp">
          <label for="link">Link</label>
          <p>{current?.link}</p>
        </div>
        <div className="modalCamp">
          <label for="visibility">Visibilidad</label>
          <p>{current?.visibility == 0 ? <>Visible</> : <>Oculto</>}</p>
        </div>
        <div className="modalCamp">
          <label for="isSaved">Guardado</label>
          <p>{current?.isSaved == 0 ? <>No</> : <>Si</>}</p>
        </div>
        <div className="modalCamp">
          <label for="descripcion">Descripción</label>
          <p>{current?.description}</p>
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