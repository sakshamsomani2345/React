import React, { useEffect, useState } from "react";
import Loading from "./Loading";
function Github() {
  const [users, setusers] = useState([]);
  const [loading,setloading]=useState(true);
  const fetchdata = async () => {
    try {
        setloading(false);
        const data = await fetch("https://api.github.com/users");
        const parsedData = await data.json();
        console.log(parsedData[0].login);
        setusers(parsedData);  
    } catch (error) {
        setloading(false);
        
        console.log(error);
    }
   
  };
  
  useEffect(() => {
    document.body.style = 'background: skyblue;';
    fetchdata();
  }, []);
  if(loading){
    return <Loading/>
  }
  return (
    <>
      <h2 className="text-center">List of Github Users</h2>
      <div className="container-fluid mt-5">
        <div className="row text-center">
          {/* {users.map((element) => {
        return (
          <div className="col-md-3" key={element.url}>
            <Card
              
              avatar={element.avatar_url}
              login={element.login}
              id={element.id}
            />
          </div>
        );
      })} */}
      {users.map((element) => {
        return (
          <div className="col-10 col-md-4 mt-5" key={element.id}>
            <div className="card p-2">
              <div className="d-flex align-items-center">
                <div className="image">
                  {" "}
                  <img src={element.avatar_url} alt=""className="rounded" width="155" />{" "}
                </div>
                <div className="ml-3 w-100">
                  <h4 className="mb-0 mt-0 textLeft">
                    {element.login}
                  </h4>
                  {/* <span className="text-left">{type }</span> */}
                  <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                    <div className="d-flex flex-column">
                      <span className="articles">Articles</span>{" "}
                      <span className="number1">38</span>{" "}
                    </div>
                    <div className="d-flex flex-column">
                      <span className="followers">Followers</span>{" "}
                      <span className="number2">980</span>{" "}
                    </div>
                    <div className="d-flex flex-column">
                      <span className="rating">Rating</span>{" "}
                      <span className="number3">8.9</span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            );
        })}
        </div>
      </div>
    </>
  );
}

export default Github;
