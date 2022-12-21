import React from 'react'
import '../../styles/Events.css'

function Events() {
  return (
    <div className="eventPageContainer">
      <h1 id='evH1'>Próximos Eventos</h1>
      <div className="liveEventsContainer">
        <h2>Eventos en vivo</h2>
        <div className="liveEventsList">

{/*Información hardcodeada*/}
          <div className="singleEvent">
            <div className="seLeftContainer">
              <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
            </div>
            <div className="seRightContainer">
              <h3>Título Evento 1</h3>
              <p>descripción</p>
              <p>fecha</p>
              <a href="#">Link</a>
            </div>
          </div>

          <div className="singleEvent">
            <div className="seLeftContainer">
              <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
            </div>
            <div className="seRightContainer">
              <h3>Título Evento 2</h3>
              <p>descripción</p>
              <p>fecha</p>
              <a href="#">Link</a>
            </div>
          </div>

        </div>

      </div>

      <div className="liveEventsContainer">
        <h2>Game Jams</h2>
        <div className="liveEventsList">

{/*Información hardcodeada*/}
          <div className="singleEvent">
            <div className="seLeftContainer">
              <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
            </div>
            <div className="seRightContainer">
              <h3>Game Jam 1</h3>
              <p>descripción</p>
              <p>fecha</p>
              <a href="#">Link</a>
            </div>
          </div>

        </div>

      </div>

      <h1 id='evH1'>Historial de Eventos</h1>

      <div className="liveEventsContainer">
        <div className="pastEventsList">

{/*Información hardcodeada*/}
          <div className="singleEvent" id='pastSingleEvent'>
            <div className="pastEvContainer">
              <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
              <h3>Evento pasado</h3>
              <p>descripción</p>
            </div>
          </div>

          <div className="singleEvent" id='pastSingleEvent'>
            <div className="pastEvContainer">
              <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
              <h3>Evento pasado</h3>
              <p>descripción</p>
            </div>
          </div>

          <div className="singleEvent" id='pastSingleEvent'>
            <div className="pastEvContainer">
              <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
              <h3>Evento pasado</h3>
              <p>descripción</p>
            </div>
          </div>

          <div className="singleEvent" id='pastSingleEvent'>
            <div className="pastEvContainer">
              <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
              <h3>Evento pasado</h3>
              <p>descripción</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Events