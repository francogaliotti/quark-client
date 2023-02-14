import React, { useState, useEffect } from "react";
import { PrimaryButton } from "../../styles/styledComponents/Buttons";
import "../../styles/Modal.css";
import { SingleQuestion } from "./singleQuestion";
import Alert from "../../services/alertService";
import { useDispatch, useSelector } from "react-redux";
import { backToZero, sendForm } from "../../features/formSlice";
import { getPublic } from "../../services/apiService";
import { selectUser } from "../../features/userSlice";

export const ChallengeModal = ({ onClose, idScholarship, fetch }) => {

  const [isSended, setSended] = useState(false);
  const [questionnary, setQuestionnary] = useState({})

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleResult = () => {
    setSended(true);
    Alert.confirmWithCancel(
      { title: "Enviar formulario?", message: "Esta accion es irreversible" },
      () => {
        dispatch(sendForm({userid: user.id, scholarshipid: idScholarship}));
        onClose()
        fetch()
      }, 
      ()=> {
        dispatch(backToZero())
        setSended(false)
      }
    );
  };

  const fetchQuestions = async () => {
    const res = await getPublic(`/challenge/getQuestionnaire/13`)
    setQuestionnary(res.data)
  }

  useEffect(()=>{
    fetchQuestions()
  }, [])


  return (
    <div className="overlay" id="challengeOverlayId" onClick={onClose}>
      <div
        className="modalContainer"
        onClick={(e) => e.stopPropagation()}
        id="formModal"
      >
        <p className="closeBtn" onClick={onClose}>
          X
        </p>
        <h3>{questionnary.name}</h3>
        {questionnary.questions?.map((q, id) => {
          return (
            <div className="modalCamp">
              <SingleQuestion
                key={id}
                question={q}
                id={id}
                isSended={isSended}
              />
            </div>
          );
        })}

        <PrimaryButton onClick={handleResult}>Enviar Desafío</PrimaryButton>
      </div>
    </div>
  );
};
