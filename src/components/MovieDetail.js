import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Card,
  ListGroup,
} from "react-bootstrap";
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

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result && result.show) {
        setMovie(result.show);
        setError(null);
      } else {
        setMovie(null);
        setError("Movie not found");
      }
    } catch (error) {
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
          <Spinner animation="border" variant="primary" size="lg" />
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
      <Container className="py-4">
        <Button
          variant="secondary"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card className="movie-card shadow-lg rounded">
              {movie.backdrop_path && (
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.original_title}
                  className="movie-backdrop"
                />
              )}

              <Card.Body>
                <Card.Title className="movie-title">
                  {movie.original_title}
                </Card.Title>
                <Row>
                  {movie.poster_path && (
                    <Col md={4} className="mb-3">
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.original_title}
                        className="movie-poster img-fluid rounded"
                      />
                    </Col>
                  )}
                  <Col md={8}>
                    <Card.Text className="movie-overview">
                      {movie.overview}
                    </Card.Text>

                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Genres:</strong>{" "}
                        {movie.genres
                          ? movie.genres.join(", ")
                          : "No genres available"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>First Aired:</strong> {movie.first_aired}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Language:</strong> {movie.language || "Unknown"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Status:</strong> {movie.status || "Unknown"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Runtime:</strong>{" "}
                        {movie.runtime ? `${movie.runtime} minutes` : "Unknown"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Rating:</strong> {movie.rating || "Not Rated"}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MovieDetail;
