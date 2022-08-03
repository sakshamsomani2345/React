import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
// import {  useNavigate } from 'react-router-dom';
import ErrorMessage from '../errormessage/ErrorMessage';
import './Questions.css'
function Question({currques,setcurrques,questions,options,correct,setScore,score,setquestions}) {
    const [selected,setselected]=useState();
    const [error,seterror]=useState(false);
    let navigate = useNavigate();
    const handleSelect=(i)=>{
if(selected===i && selected===correct){
    return 'select'
}else if(selected===i && selected!==correct){
    return 'wrong';
}else if(i===correct){
return 'select';
}
    }
    const handleCheck=(i)=>{
      console.log("rgtr");
setselected(i);
if(i===correct){setScore(score+1)};

seterror(false);
    }
    const handleQuit = () => {
        setcurrques(0);
        // setquestions();
      };
    const handleNext = () => {
        if (currques > 8) {
            navigate("/result");

        } else if (selected) {
          // setscore(score+1);
          setcurrques(currques + 1);
          setselected();
        } else seterror("Please select an option first");
      };
    // console.log(questions[currques].question);
  return (
    <div className='question'>
      <h1>
        Question {currques+1}
      </h1>
      <div className="singleQuestion">
        <h2 >
            {questions[currques].question}
        </h2 >
        <div className="options">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {options && options.map(i=>(
            <button
            onClick={() => handleCheck(i)}
               className={`singleOption
              ${selected && handleSelect(i)}`}
            key={i}
            disabled={selected}>
                {i}
            </button>
        ))}
        </div>
        <div className="controls">
            <Button  variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}>Quit</Button>
            <Button    variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
            >Next Question</Button>

        </div>
      </div>
    </div>
  )
}

export default Question
