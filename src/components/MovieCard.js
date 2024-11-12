import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <Card className="movie-card" onClick={handleCardClick}>
      <Card.Img variant="top" src={movie.poster_path} className="img-fluid" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
