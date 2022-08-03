import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css"
function Quiz({ name, score, questions, setquestions, setScore }) {
  const [options, setoptions] = useState();
  const [currques, setcurrques] = useState(0);

  useEffect(() => {
    console.log(questions);
    setoptions(
      questions &&
        handleshuffle([
          questions[currques]?.correct_answer,
          ...questions[currques]?.incorrect_answers,
        ])
    );
  }, [questions,currques]);
  console.log(options);
  const handleshuffle = (optionss) => {
    return optionss.sort(() => Math.random() - 0.5);
  };
  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      {questions ? (
        <>
          <div className="quizInfo">
            <span>{questions[currques].category}</span>
            <span>
              {/* {questions[currques].difficulty} */}
              Score : {score}
            </span>
          </div>
          <Question
            currques={currques}
            setcurrques={setcurrques}
            questions={questions}
            options={options}
            correct={questions[currques]?.correct_answer}
            score={score}
            setScore={setScore}
            setquestions={setquestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
}

export default Quiz;
