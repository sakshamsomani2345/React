import React, { Component } from "react";
// import { movies } from "./getMovies";
import axios from "axios";
import Banner from "./Banner";
export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currpage: 1,
      movies: [],
      favourites: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5ce2d3feb38f64f74c94208daf524e32&language=en-US&page=${this.state.currpage}`
    );
    const data = res.data;
    this.setState({
      movies: [...data.results],
    });
  }
  async changemovies() {
    console.log(this.state.currpage);
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5ce2d3feb38f64f74c94208daf524e32&language=en-US&page=${this.state.currpage}`
    );
    const data = res.data;
    this.setState({
      movies: [...data.results],
    });
  }
  handleright = () => {
    let temparr = [];
    for (let index = 1; index < this.state.parr.length + 1; index++) {
      temparr.push(index);
    }
    this.setState(
      {
        parr: [...temparr],
        currpage: this.state.currpage + 1,
      },
      this.changemovies
    );
  };
  handleleft = () => {
    if (this.state.currpage != 1) {
      this.setState(
        {
          currpage: this.state.currpage - 1,
        },
        this.changemovies
      );
    }
  };
  handleclick = (value) => {
    if (value != this.state.currpage) {
      this.setState(
        {
          currpage: value,
        },
        this.changemovies
      );
    }
  };
  handlefavourite = (movie) => {
    let oldata = JSON.parse(localStorage.getItem("movies") || "[]");
    if (this.state.favourites.includes(movie.id)) {
      oldata = oldata.filter((m) => m.id != movie.id);
    } else {
      oldata.push(movie);
    }
    localStorage.setItem("movies", JSON.stringify(oldata));
    console.log(oldata);
    this.handlestatefav();
  };
  handlestatefav = () => {
    let oldata = JSON.parse(localStorage.getItem("movies") || "[]");

    let temp = oldata.map((movie) => movie.id);
    this.setState({
      favourites: [...temp],
    });
  };
  render() {
    // let movie = movies.results;

    return (
      <>
        <Banner />
        {this.state.movies.length == 0 ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">Trending...</h3>
            <div className="movies-list">
              {this.state.movies.map((movieobj) => {
                return (
                  <div
                    onMouseEnter={() => this.setState({ hover: movieobj.id })}
                    onMouseLeave={() => this.setState({ hover: "" })}
                    className="card movies-card"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`}
                      alt={movieobj.title}
                      className="card-img-top movies-img"
                    />
                    {/* <div className="card-body"> */}
                    <h4 className="movies-title card-title">
                      {movieobj.title}
                    </h4>
                    {/* <p className="movies-text card-text">{movieobj.overview}</p> */}
                    <div
                      className="button-wrapper"
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.hover == movieobj.id && (
                        <a
                          onClick={() => this.handlefavourite(movieobj)}
                          className="btn btn-primary movies-button"
                        >
                          {
                            this.state.favourites.includes(movieobj.id)?"Remove":"Add"
                          }
                          {/* Add to favourites */}
                        </a>
                      )}
                    </div>

                    {/* </div> */}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" onClick={this.handleleft}>
                      Previous
                    </a>
                  </li>

                  {this.state.parr.map((value) => (
                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => this.handleclick(value)}
                      >
                        {value}
                      </a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a className="page-link" onClick={this.handleright}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
