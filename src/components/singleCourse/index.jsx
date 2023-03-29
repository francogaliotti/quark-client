import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import '../../styles/MyCourses.css'
import {
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
  ProgressBar,
} from "react-bootstrap";

export const SingleCourse = ({ course }) => {
  const navigate = useNavigate();

  const [stats, showStats] = useState(false);

  const handleMoodleCourse = (id) => {
    navigate(`/course/${id}`);
    //window.open(env.MOODLE_URL + `course/view.php?id=${id}`, "_blank", "noopener noreferrer")
  };
  return (
    <Card className="mb-3 card-quark">
      <Card.Img variant="top" src={course.url} alt="Imagen de la tarjeta" />
      {!stats ? (
        <>
          <Card.Body>
            <h5 className="card-title">{course.fullName}</h5>
            <p className="card-text">@Ultima Unidad Cursada</p>
              <a
                className="btn btn-outline-primary btn-quark"
                onClick={() => handleMoodleCourse(course.idCurso)}
              >
                Continuar cursado
              </a>
              <a
                className="btn btn-outline-primary btn-quark" /*onClick={() => showStats(!stats)}*/
              >
                Stats
              </a>
          </Card.Body>
        </>
      ) : (
        <Card.Body>
          <ProgressBar
            now={Math.round(course.progress)}
            label={`Avance Cursado ${course.fullName}: ${Math.round(
              course.progress
            )}%`}
          />
          <Card.Footer>
            <label>@Ultima Unidad Cursada</label>
            <ButtonGroup>
              <Button
                variant="primary"
                onClick={() => handleMoodleCourse(course.idCurso)}
              >
                Continuar cursado
              </Button>
              <Button
                variant="outline-success"
                onClick={() => showStats(!stats)}
              >
                stats
              </Button>
            </ButtonGroup>
          </Card.Footer>
        </Card.Body>
      )}
    </Card>
  );
};