import React, { Component } from "react";
import { movies } from "./getMovies";
export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      currgen: "All Genres",
      movies: [],
      currtext: "",
      limit: 5,
      currPage: 1,
    };
  }
  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("movies") || "[]");
    let temparr = [];
    data.forEach((movieobj) => {
      if (!temparr.includes(genreids[movieobj.genre_ids[0]])) {
        temparr.push(genreids[movieobj.genre_ids[0]]);
      }
    });
    temparr.unshift("All Genres");
    this.setState({
      genres: [...temparr],
      movies: [...data],
    });
  }
  handlePageChange = (page) => {
    this.setState({
      currPage: page,
    });
  };
  handleDelete = (id) => {
    let newarr = [];
    newarr = this.state.movies.filter((movieObj) => movieObj.id != id);
    this.setState({
      movies: [...newarr],
    });
    localStorage.setItem("movies", JSON.stringify(newarr));
  };
  handlegenre(genre) {
    this.setState({
      currgen: genre,
    });
  }
  sortbig = () => {
    let temp = this.state.movies;
    temp.sort(function (obja, objb) {
      return objb.popularity - obja.popularity;
    });
    this.setState({
      movies: [...temp],
    });
  };
  sortsmall = () => {
    let temp = this.state.movies;
    temp.sort(function (obja, objb) {
      return obja.popularity - objb.popularity;
    });
    this.setState({
      movies: [...temp],
    });
  };
  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let filterarr = [];
    if (this.state.currtext == "") {
      filterarr = this.state.movies;
    } else {
      filterarr = this.state.movies.filter((movieobj) => {
        let title = movieobj.original_title.toLowerCase();
        return title.includes(this.state.currtext.toLowerCase());
      });
    }
    if (this.state.currgen != "All Genres") {
      filterarr = this.state.movies.filter(
        (movieobj) => genreids[movieobj.genre_ids[0]] == this.state.currgen
      );
    }
    let pages = Math.ceil(filterarr.length / this.state.limit);
    let pagesarr = [];
    for (let i = 1; i <= pages; i++) {
      pagesarr.push(i);
    }
    let si = (this.state.currPage - 1) * this.state.limit;
    let ei = si + this.state.limit;
    filterarr = filterarr.slice(si, ei);
    return (
      <>
        <div className="main">
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <div className="list-group favourites-genres ">
                {this.state.genres.map((genre) => {
                  return this.state.currgen == genre ? (
                    <div
                      style={{
                        background: "#3f51b5",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      className="list-group-item"
                    >
                      {genre}
                    </div>
                  ) : (
                    <div
                      onClick={() => this.handlegenre(genre)}
                      style={{
                        background: "white",
                        color: "#3f51b5",
                        fontWeight: "bold",
                      }}
                      className="list-group-item"
                    >
                      {genre}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-9 favourites-table col-sm-12">
              <div className="row">
                <input
                  type="text"
                  placeholder="Search"
                  value={this.state.currtext}
                  onChange={(e) => {
                    this.setState({
                      currtext: e.target.value,
                    });
                  }}
                  className="input-group-text col"
                />
                <input
                  type="number"
                  onChange={(e) => this.setState({ limit: e.target.value })}
                  placeholder="Rows Count"
                  className="input-group-text col"
                />
              </div>
              <div className="row">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">
                        <span onClick={this.sortbig}>+</span>Popularity
                        <span onClick={this.sortsmall}>-</span>
                      </th>
                      <th scope="col">Rating</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterarr.map((movieobj) => {
                      return (
                        <tr>
                          <td>
                            <img
                              style={{
                                width: "5rem",
                                margin: ".3rem",
                              }}
                              src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`}
                              alt={movieobj.title}
                            />
                            {movieobj.original_title}
                          </td>
                          <td>{genreids[movieobj.genre_ids[0]]}</td>
                          <td>{movieobj.popularity}</td>
                          <td>{movieobj.vote_average}</td>
                          <td>
                            {" "}
                            <button
                              onClick={() => this.handleDelete(movieobj.id)}
                              className="btn btn-danger"
                            >
                              Delete{" "}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {pagesarr.map((page) => (
                    <li class="page-item">
                      <a
                        class="page-link"
                        onClick={() => this.handlePageChange(page)}
                      >
                        {page}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}
