import React, { useEffect, useState } from "react";
import "./CSS/style.css";
function Tempapp() {
  const [search,setsearch]=useState("mumbai");
  const [city,setcity]=useState(null);
  const [min,setmin]=useState("65465554")
  const [max,setmax]=useState("65465554")
  const [temp,settemp]=useState("65465554")


  const fetchdata=async()=>{
    const data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8507ae247b8003f10b27f08db4b235bf`)
    const res=await data.json();
    setmin(res.main.temp_min);
    setmax(res.main.temp_max);
    settemp(res.main.temp);

    


  }
  useEffect(()=>{
    document.body.style = 'background: pink;';

    fetchdata();
  },[search])
  return (<>
    <div className="box">
      <div className="inputData">
        <input type="search" className="inputField" onChange={(event) => {
            setsearch(event.target.value);
            setcity(event.target.value);
        }} />
      </div>
      {
        !city ? (
            <p>no data found</p>
        ):(
            <div>
<div className="info">
        <h2 className="location">
          <i className="fas fa-street-view">{search}</i>{" "}
        </h2>
        <h1 className="temp">{temp} Cel</h1>
        <h3 className="tempmin_max">Min:{min} | Max:{max}</h3>
      </div>
    <div className="wave -one"></div>
    <div className="wave -two"></div>
    <div className="wave -three"></div>
    </div>
        )
      }
      
    </div>

    </>
  );
}

export default Tempapp;
