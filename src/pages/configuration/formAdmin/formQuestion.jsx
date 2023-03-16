import React, { useState } from "react";
import Alert from "../../../services/alertService";
import { QuestionAnswer } from "./questionAnswer";

export const FormQuestion = ({ addQuestion }) => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answerList, setAnswerList] = useState([]);

  const addAnswer = (a) => {
    setAnswerList([...answerList, a]);
    console.log(answerList);
  };

  const deleteAnswer = (a) => {
    const newArray = answerList.filter((obj) => {
      return obj !== a;
    });
    setAnswerList(newArray);
  };

  return (
    <div className="formQuestionContainer">
      <div className="modalCamp">
        <div className="questionContainer">
          <h4>Nueva pregunta: </h4>
          <input
            type="text"
            value={currentQuestion?.name}
            onChange={(e) => setCurrentQuestion({ name: e.target.value })}
          />
          <button
            className="plus"
            onClick={() => {
              let counter = 0;
              answerList?.map((a) => {
                if (a.correct == 1) {
                  counter++;
                }
              });
              if (counter === 1) {
                addQuestion({ ...currentQuestion, answerList });
                setCurrentQuestion({ ...currentQuestion, name: "" });
                setAnswerList([]);
              } else {
                Alert.error({ title: "Solo una correcta!" });
              }
            }}
          >
            +
          </button>
          <div className="answersList">
            {answerList?.map((a, index) => {
              return (
                <p className="singleAnswer">
                  Respuesta {index + 1}: {a.name} {a.correct}
                  <button className="plus" onClick={() => deleteAnswer(a)}>
                    -
                  </button>
                </p>
              );
            })}
          </div>
          <QuestionAnswer addAnswer={addAnswer} />
        </div>
      </div>
    </div>
  );
};
