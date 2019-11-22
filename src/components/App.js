import React, {useState, useEffect} from 'react';
import '../App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";


const MOVIE_API_URL = "http://www.omdbapi.com/?s=pokemon&apikey=7d5e034c";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(()=>{
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
              setMovies(jsonResponse.Search);
                if (!!movies) {
                    setErrorMessage("No results!");
                }
              setLoading(false);
            });
      },
      []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    console.log(errorMessage);

    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=7d5e034c`)
        .then(response => response.json())
        .then(jsonResponse => {
          setMovies(jsonResponse.Search);
            if (!!movies) {
                setErrorMessage("No results!");
            }
          setLoading(false);
        })
  };

  return (
      <div className="App">
        <Header text="Hooked!" />
        <Search search={search} />
        <p className="App-intro">
          Sharing a few of our favourite movies
        </p>
        <div className="movies">
          {loading && !errorMessage ? (
              <span>
                Now loading...
              </span>
          ) : errorMessage ? (
              <div className="errorMessage">
                {errorMessage}
              </div>
          ) : !!movies ? (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          ) : (
              <div className="errorMessage">
                  No results!!!
              </div>
          )
          }
        </div>
      </div>
  )

};

export default App;
