import React, { useState, useEffect } from "react";
import { PrimaryButton } from "../../styles/styledComponents/Buttons";
import "../../styles/Modal.css";
import { SingleQuestion } from "./singleQuestion";
import Alert from "../../services/alertService";
import { useDispatch } from "react-redux";
import { backToZero, sendForm } from "../../features/formSlice";
import { getPublic } from "../../services/apiService";

export const ChallengeModal = ({ onClose }) => {
  const hardcodedQuestionary = {
    name: "nombreform",
    questionList: [
      {
        name: "¿kdhkjashdkjashdasdad aslkdj ?",
        answerList: [
          {
            name: "asd asd asd asd asd sadas ",
            correct: 0,
          },
          {
            name: "a dsadsq wqweqweqw ",
            correct: 0,
          },
          {
            name: "asdqwqweadsdsa",
            correct: 1,
          },
          {
            name: "asdqwweasdasdasdasasdas das dasd ",
            correct: 0,
          },
        ],
      },
      {
        name: "¿kdhkjashdkjashdasdaj asldk ?",
        answerList: [
          {
            name: "asd asd asd asd asd sadas ",
            correct: 0,
          },
          {
            name: "a dsadsq wqweqweqw ",
            correct: 0,
          },
          {
            name: "asdqwqweadsdsa",
            correct: 1,
          },
          {
            name: "asdqwweasdasdasdasasdas das dasd ",
            correct: 0,
          },
        ],
      },
      {
        name: "¿kdkjashdasdad aslkdj asldk ?",
        answerList: [
          {
            name: "asd asd asd asd asd sadas ",
            correct: 0,
          },
          {
            name: "a dsadsq wqweqweqw ",
            correct: 0,
          },
          {
            name: "asdqwqweadsdsa",
            correct: 1,
          },
          {
            name: "asdqwweasdasdasdasasdas das dasd ",
            correct: 0,
          },
        ],
      },
      {
        name: "¿kdhkjashshdasdad aslkdj asldk ?",
        answerList: [
          {
            name: "asd asd asd asd asd sadas ",
            correct: 0,
          },
          {
            name: "a dsadsq wqweqweqw ",
            correct: 0,
          },
          {
            name: "asdqwqweadsdsa",
            correct: 1,
          },
          {
            name: "asdqwweasdasdasdasasdas das dasd ",
            correct: 0,
          },
        ],
      },
      {
        name: "¿kdhkjashdkjashdasdj asldk ?",
        answerList: [
          {
            name: "asd asd asd asd asd sadas ",
            correct: 0,
          },
          {
            name: "a dsadsq wqweqweqw ",
            correct: 0,
          },
          {
            name: "asdqwqweadsdsa",
            correct: 1,
          },
          {
            name: "asdqwweasdasdasdasasdas das dasd ",
            correct: 0,
          },
        ],
      },
      {
        name: "¿kdhkjashdkjashdasdsldk ?",
        answerList: [
          {
            name: "asd asd asd asd asd sadas ",
            correct: 0,
          },
          {
            name: "a dsadsq wqweqweqw ",
            correct: 0,
          },
          {
            name: "asdqwqweadsdsa",
            correct: 1,
          },
          {
            name: "asdqwweasdasdasdasasdas das dasd ",
            correct: 0,
          },
        ],
      },
      {
        name: "¿asdasdasdatyud asd? ",
        answerList: [
          {
            name: "asd asd asd asd asdas ",
            correct: 0,
          },
          {
            name: "as dasd asd asd asd asd ",
            correct: 0,
          },
          {
            name: "aaaa",
            correct: 1,
          },
        ],
      },
    ],
  };

  const [isSended, setSended] = useState(false);
  const [questionnary, setQuestionnary] = useState({})

  const dispatch = useDispatch();

  const handleResult = () => {
    setSended(true);
    Alert.confirmWithCancel(
      { title: "Enviar formulario?", message: "Esta accion es irreversible" },
      () => {
        dispatch(sendForm());
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
    <div className="overlay" onClick={onClose}>
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
