import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";

export const PersonalInfoModal = ({ show, setShow }) => {

    const[exp, setExp] = useState(1);
    const[hours, setHours] = useState(1);

    const cambioRadioExp=e=>{
      setExp(parseInt(e.target.value));
    }

    const cambioRadioHours=e=>{
        setHours(parseInt(e.target.value));
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
          Preguntas Developer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
      <Form>
        <Form.Group>
          <h5>Años de experiencia</h5>
          <Row>
            <Col>
              <Form.Check
                type="radio"
                label="Sin experiencia"
                id="radioE1"
                value="1"
                checked={exp === 1}
                onChange={cambioRadioExp}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="0-2 Años"
                id="radioE2"
                value="2"
                checked={exp === 2}
                onChange={cambioRadioExp}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="3-5 Años"
                id="radioE3"
                value="3"
                checked={exp === 3}
                onChange={cambioRadioExp}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="+5 Años"
                id="radioE4"
                value="4"
                checked={exp === 4}
                onChange={cambioRadioExp}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <h5>Cuantas horas estimas dedicarle al cursado</h5>
          <Row>
            <Col>
              <Form.Check
                type="radio"
                label="Poco -2Hs Sem"
                id="radioH1"
                value="1"
                checked={hours === 1}
                onChange={cambioRadioHours}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Normal 4Hs Sem"
                id="radioH2"
                value="2"
                checked={hours === 2}
                onChange={cambioRadioHours}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Intenso +6Hs Sem"
                id="radioH3"
                value="3"
                checked={hours === 3}
                onChange={cambioRadioHours}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary">Listo! Ver mis opciones</Button>
      </Form>
    </Container>
      </Modal.Body>
    </Modal>
  );
};
