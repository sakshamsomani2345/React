import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
    <div style={{
        display: "flex",
        padding:"0.5" 
      }}>
      <Link 
      style={{
        textDecoration:"none"
      }}
      to ="/">
           <h1>Movies App</h1>
      </Link>
      
      <Link  style={{
        textDecoration:"none"
      }} to ="/favourite">
     
        <h2 style={{
            marginLeft:"2rem",
            marginTop:"1rem"
        }}>Favourites</h2>
      </Link>
      </div>
    )
  }
}
