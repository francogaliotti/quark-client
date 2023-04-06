import React from 'react'
import isEmpty from "../../images/Ups.png"

const Error = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems:"center", height: "500px", flexDirection: "column"}}>
      <img src={isEmpty} />

      <h3 style={{marginTop: "20px", color: "#0B2A3F"}}>Ups... No hay nada por aqui</h3>
    </div>
  )
}

export default Error
