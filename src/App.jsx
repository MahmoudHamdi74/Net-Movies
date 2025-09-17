import { useEffect, useRef, useState } from "react";
import "./app.css";

import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Details from "../pages/Details/Details";
import Favorites from "../pages/Favorites/Favorites";
import Home from "../pages/Home/Home";
import Movies from "../pages/Movies/Movies";
import Context from "./Context/Context";
import { NavbarLink } from "flowbite-react";

// ✅ مودال الفيلم
function MyVerticallyCenteredModal({ show, onHide, movie }) {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header style={{ backgroundColor: "#00000013" }} closeButton>
        <Modal.Title>{movie.title || movie.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: "#ffffff1e",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
          alt={movie.title}
          style={{ alignContent: "center" }}
        />
        <p>{movie.overview}</p>
      </Modal.Body>

      <Modal.Footer
        style={{
          backgroundColor: "#00000013",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// ✅ الكومبوننت الأساسي
function App() {
  const [modalShow, setModalShow] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [fave, setFave] = useState([]); // بدون localStorage
  const input = useRef();

  // API Options
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjdlNTdjMDRjNmYxNjM1MDVhYzE1YjhkZDA5MzQ2MSIsIm5iZiI6MTc1NzUwMTAzMy4wNzQsInN1YiI6IjY4YzE1NjY5ZjcxYTYyNjRlYzFiZDhkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ejCjS3TO9sKhfq6bIV2PFzfjv8Y_tjZA9Gb-VOaF8zg",
    },
  };

  // ✅ fetch movies
  useEffect(() => {
    const endpoint = query
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}&include_adult=false`
      : `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}&include_adult=false`;

    fetch(endpoint, API_OPTIONS)
      .then((res) => res.json())
      .then((res) => setMovies(res.results || []))
      .catch((err) => console.error(err));
  }, [page, query]);

  // ✅ handle add/remove favorite
  const HandleAdd = (movie) => {
    if (fave.find((fav) => fav.id === movie.id)) {
      setFave(fave.filter((fav) => fav.id !== movie.id)); // remove
    } else {
      setFave([...fave, movie]); // add
    }
  };

  return (
    <Context.Provider value={{ HandleAdd, fave }}>
      <div>
      <BrowserRouter>

        {/* ✅ Navbar */}
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.C7XR_K-3IqfP33vfDUgl7wHaEW"
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <NavLink className={"home"} to="/movies">Movies</NavLink>
                <NavLink className={"home"} to="/favorites">Favorites</NavLink>
              </Nav>
              <Form
                className="d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  setPage(1);
                  setQuery(input.current.value);
                }}
              >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  ref={input}
                />
                <Button type="submit" variant="outline-danger">
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* ✅ Router */}
        <div className="mx-auto col-10">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    movies={movies}
                    setModalShow={setModalShow}
                    setPage={setPage}
                    page={page}
                    setSelected={setSelected}
                    modalShow={modalShow}
                    HandleAdd={HandleAdd}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <Movies
                    movies={movies}
                    setSelected={setSelected}
                    setModalShow={setModalShow}
                    modalShow={modalShow}
                    selected={selected}
                    setPage={setPage}
                    page={page}
                    HandleAdd={HandleAdd}
                  />
                }
              />
              <Route path="/favorites" element={<Favorites fave={fave} />} />
              <Route
                path="/details/:id"
                element={
                  <Details
                    movies={movies}
                    setModalShow={setModalShow}
                    setSelected={setSelected}
                    modalShow={modalShow}
                    selected={selected}
                  />
                }
              />
            </Routes>

            {/* ✅ Movie Modal */}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              movie={selected}
            />
        </div>
          </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;
