import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../../styles/styledComponents/Buttons";
import "../../../styles/Modal.css";
import { getPublic, postPublic, putPublic } from "../../../services/apiService";
import Alert from "../../../services/alertService";
import { FormQuestion } from "./formQuestion";

export const EditFormModal = ({
  open,
  onClose,
  fetch,
  update,
  setUpdate,
  current,
  setCurrent,
}) => {
  const [actualForm, setActualForm] = useState(current);
  const [questionList, setQuestionList] = useState([]);

  const addQuestion = (q) => {
    setQuestionList([...questionList, q]);
  };

  const deleteQuestion = (q) => {
    const newArray = questionList.filter((obj) => {
      return obj !== q;
    });
    setQuestionList(newArray);
  };

  useEffect(() => {
    setActualForm(current);
  }, [current]);

  const handleSubmit = async () => {
    console.log(JSON.stringify({name: actualForm.name, questionList}))
    try {
      if (!update) {
        const res = await postPublic(`challenge/create`, {name: actualForm.name, questionList});
        Alert.success({ title: "Añadido!", message: "Formulario añadido" });
      } else {
        const res = await putPublic(`/events/update`, {});
        Alert.success({ title: "Actualizado!", message: "Evento actualizado" });
        setUpdate(false);
        setCurrent({});
      }
      onClose();
      fetch();
    } catch (e) {
      console.log(e);
      Alert.error({ title: "Error!", message: e.response.data.msg });
    }
  };

  const closeModal = () => {
    onClose();
    setQuestionList([]);
  };

  if (!open) return null;
  return (
    <div className="overlay" onClick={closeModal}>
      <div
        className="modalContainer"
        onClick={(e) => e.stopPropagation()}
        id="formModal"
      >
        <p className="closeBtn" onClick={closeModal}>
          X
        </p>
        <div className="modalCamp">
          <label for="title">Nombre</label>
          <input
            id="title"
            className="modalInput"
            value={actualForm?.name}
            onChange={(e) =>
              setActualForm({ ...actualForm, name: e.target.value })
            }
          />
        </div>
        {questionList.map((q, index) => {
          return (
            <div className="modalCamp">
              <div className="questionContainer">
                <h4>
                  Pregunta {index + 1}: {q.name}{" "}
                </h4>
                <div className="answersList">
                  {q.answerList?.map((a, index) => {
                    return (
                      <p className="singleAnswer">
                        Respuesta {index+1}: {a.name} {a.correct}
                      </p>
                    );
                  })}
                </div>
                <button className="plus" onClick={() => deleteQuestion(q)}>
                  -
                </button>
              </div>
            </div>
          );
        })}
        <FormQuestion addQuestion={addQuestion} />
        <PrimaryButton id="createButton" onClick={() => handleSubmit()}>
          {update ? <>Actualizar</> : <>Crear</>}
        </PrimaryButton>
      </div>
    </div>
  );
};
