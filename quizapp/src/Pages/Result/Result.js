import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Result({name,score}) {
  const navigate=useNavigate();
  console.log(score);
  useEffect(()=>{
    if(!name){
      Navigate('/');
    }
  },[name,navigate])
  return (
    <div className='result'>
    <span className="title">
      Final Score:{score}</span>      
    </div>
  )
}

export default Result
