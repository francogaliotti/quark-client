import React, { useState } from "react";

export const QuestionAnswer = ({ addAnswer }) => {
  const [currentAnswer, setCurrentAnswer] = useState({ name: "", correct: 0 });

  return (
    <div className="questionAnswerContainer">
      <div className="fillForms">
        <h4 className="answerH4">Nueva respuesta: </h4>
        <input
          type="text"
          value={currentAnswer?.name}
          onChange={(e) =>
            setCurrentAnswer({ ...currentAnswer, name: e.target.value })
          }
        />
        <select
          onChange={(e) =>
            setCurrentAnswer({ ...currentAnswer, correct: e.target.value })
          }
        >
          <option value="0">Incorrecta</option>
          <option value="1">Correcta</option>
        </select>
        <button
          className="plus"
          onClick={() => {
            addAnswer(currentAnswer);
            setCurrentAnswer({ ...currentAnswer, name: "" });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
