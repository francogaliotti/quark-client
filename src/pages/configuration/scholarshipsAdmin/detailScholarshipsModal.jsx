import React from 'react'
import '../../../styles/Modal.css'

const DetailScholarshipsModal = ({ open, onClose, current, setCurrent }) => {

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
          <label for="title">Titulo: {current?.name}</label>
        </div>
        <div className="modalCamp">
          <label for="link">Duración: {current?.duration}</label>
        </div>
        <div className="modalCamp">
          <label for="link">Cantidad: {current?.amount}</label>
        </div>
        <div className="modalCamp">
          <label for="eventDate" >Fecha de finalización: {new Date(current?.endDate).toLocaleDateString("en-AU")}</label>
        </div>
        <div className="modalCamp">
          <img className="questionImg" src={current?.img} alt="" />
        </div>
      </div>
    </div>
  )
}

export default DetailScholarshipsModal