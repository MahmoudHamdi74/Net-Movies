import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
const Details = () => {
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjdlNTdjMDRjNmYxNjM1MDVhYzE1YjhkZDA5MzQ2MSIsIm5iZiI6MTc1NzUwMTAzMy4wNzQsInN1YiI6IjY4YzE1NjY5ZjcxYTYyNjRlYzFiZDhkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ejCjS3TO9sKhfq6bIV2PFzfjv8Y_tjZA9Gb-VOaF8zg",
    },
  };

  const { id } = useParams();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch(
  `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
  API_OPTIONS
)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, []);

  console.log(movie);

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        backgroundSize: "cover",
        height: "88vh",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        }}
      >
        <div className="movie">
          {movie.backdrop_path && (
            <img
              className="pho"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                margin: "20px",
                fontFamily: "serif",
                fontSize: "2rem",
                color: "white",
              }}
            >
              {movie.title} <h1>{movie.release_date}</h1>
            </h1>
            <h1>OverView :</h1>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
