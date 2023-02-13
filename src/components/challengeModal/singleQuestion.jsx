import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAnswer } from "../../features/formSlice";
import "../../styles/Modal.css";

export const SingleQuestion = ({ question, id, isSended }) => {
  const [isCorrect, setCorrect] = useState(false);

  const dispatch = useDispatch();

  const correctAnswer = question.answers.filter((a) => {
    if (a.isCorrect) return a;
  })[0];

  useEffect(() => {
    if (isSended) {
      if (isCorrect) {
        dispatch(addAnswer(question))
      }
    }
  }, [isSended]);

  const selectAnswer = async (a) => {
    if (correctAnswer.isCorrect && a.isCorrect) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div className="questionContainer">
      <h4>
        Pregunta {id + 1}: {question.name}
      </h4>
      {question.answers?.map((a, id) => {
        return (
          <div className="answersList">
            <p className="singleAnswer">
              {a.name}
              <input
                type="radio"
                name={question.name}
                onClick={(e) => selectAnswer(a)}
              />
            </p>
          </div>
        );
      })}
    </div>
  );
};
