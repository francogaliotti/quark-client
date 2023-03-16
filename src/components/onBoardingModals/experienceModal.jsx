import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";

export const ExperienceModal = ({ show, setShow }) => {

    const[gender, setGender] = useState(1);

    const cambioRadioGender=e=>{
        setGender(parseInt(e.target.value));
      }

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Información básica
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
      <Form>
        <Form.Group>
          <h5>Genero</h5>
          <Row>
            <Col>
              <Form.Check
                type="radio"
                label="Femenino"
                id="radioG1"
                value="1"
                checked={gender === 1}
                onChange={cambioRadioGender}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Masculino"
                id="radioG2"
                value="2"
                checked={gender === 2}
                onChange={cambioRadioGender}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Otro"
                id="radioG3"
                value="3"
                checked={gender === 3}
                onChange={cambioRadioGender}
              />
            </Col>
          </Row>
        </Form.Group>

        
        <Button variant="primary">Listo! Ver mis opciones</Button>
      </Form>
    </Container>
      </Modal.Body>
    </Modal>
  )
}
