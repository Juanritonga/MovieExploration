import React, { useEffect, useState } from "react";
import { Container, Row, Col, Pagination, Form } from "react-bootstrap";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import "../styles/FilmList.css";

function FilmList() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const getMovies = async () => {
    const url = "https://movies-api14.p.rapidapi.com/shows";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a95412fba6mshd56e0b9638904d8p1c9b87jsn09d7ebb659eb",
        "x-rapidapi-host": "movies-api14.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMovies(result.movies);
      const uniqueGenres = new Set();
      result.movies.forEach((movie) => {
        movie.genres &&
          movie.genres.forEach((genre) => uniqueGenres.add(genre));
      });
      setGenres(Array.from(uniqueGenres));
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;

  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((movie) =>
      selectedGenre
        ? movie.genres && movie.genres.includes(selectedGenre)
        : true
    );

  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="FilmList">
      <Navbar />
      <div className="mt-4">
        <Container>
          <Row className="justify-content-between mb-4 g-2">
            <Col xs={12} sm="auto">
              <Form.Control
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
            </Col>
            <Col xs={12} sm="auto">
              <Form.Select
                value={selectedGenre}
                onChange={handleGenreChange}
                className="genre-select"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row className="justify-content-center">
            {currentMovies.length > 0 ? (
              currentMovies.map((movie) => (
                <Col key={movie._id} md={4} sm={6} xs={12} className="mb-4">
                  <MovieCard movie={movie} />
                </Col>
              ))
            ) : (
              <p className="text-center text-white bg-dark p-3 rounded">
                No movies found!
              </p>
            )}
          </Row>

          {totalPages > 1 && (
            <Row className="justify-content-center mt-4">
              <Col xs="auto">
                <Pagination className="pagination-custom">
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
}

export default FilmList;
