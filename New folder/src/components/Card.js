import React from "react";

function Card(props) {
    let {avatar,login,id}=props;
  return (
    <div>
      <div className="card">
        <img src={avatar} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{login}</h5>
          <p className="card-text">{id}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;;
