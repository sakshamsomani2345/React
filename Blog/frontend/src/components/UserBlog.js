
import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
function UserBlog() {
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data.user.blogs.blogs);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  // console.log(blogs);
  return (
    <div>
    {" "}
    {user &&
      user.blogs &&
      user.blogs.map((blog, index) => (
        <Blog
          id={blog._id}
          key={index}
          isUser={true}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName={user.name}
        />
      ))}
      {/* {""}
        {blogs && blogs.map((blog,index)=>{
        return <Blog key={blog.id} title={blog.title} description={blog.description} imageUrl={blog.image} userName={blog.user.name} />
      })}
      userName */}
  </div>
  )
}

export default UserBlog
