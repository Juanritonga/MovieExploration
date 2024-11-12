import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getMovieDetail = useCallback(async () => {
    const url = `https://movies-api14.p.rapidapi.com/show/${id}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a95412fba6mshd56e0b9638904d8p1c9b87jsn09d7ebb659eb",
        "x-rapidapi-host": "movies-api14.p.rapidapi.com",
      },
    };

    console.log(url);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result && result.show) {
        console.log(result);

        setMovie(result.show);
        setError(null);
      } else {
        setMovie(null);
        setError("Movie not found");
      }
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
      setError("Failed to fetch movie details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getMovieDetail();
  }, [getMovieDetail]);
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fs-5 text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }
  return (
    <div className="MovieDetail">
      <div className="movie-container">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          Back
        </button>
        <div className="movie-title">
          <h1>{movie.original_title}</h1>
        </div>
        {movie.backdrop_path && (
          <div className="movie-backdrop">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.original_title}
            />
          </div>
        )}
        <div className="row">
          {movie.poster_path && (
            <div className="col-md-4 movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.original_title}
              />
            </div>
          )}
          <div className="col-md-8 movie-details">
            <p>{movie.overview}</p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres ? movie.genres.join(", ") : "No genres available"}
            </p>
            <p>
              <strong>First Aired:</strong> {movie.first_aired}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
