import React from 'react'
import {
    Container,
    Row,
    Col,
    Card,
    ButtonGroup,
    Button,
    ProgressBar,
} from "react-bootstrap";

const MasterViewCourseCard = ({course}) => {
    console.log(course.url)
  return (
    <Card className="mb-3 card-quark">
      <Card.Img variant="top" src={course.imgUrl} alt="Imagen de la tarjeta" />
          <Card.Body>
            <h5 className="card-title">{course.fullname}</h5>
            <p className="card-text">@Ultima Unidad Cursada</p>
              <a
                className="btn btn-outline-primary btn-quark"
                // onClick={() => handleMoodleCourse(course.idCurso)}
              >
                Continuar cursado
              </a>
              <a
                className="btn btn-outline-primary btn-quark" /*onClick={() => showStats(!stats)}*/
              >
                Stats
              </a>
          </Card.Body>
    </Card>
  )
}

export default MasterViewCourseCard
