import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from 'react-icons/fa';
import Fav from '../Fav/Fav';
import { useNavigate } from 'react-router-dom';

const Cards = ({movies,setSelected,setModalShow,fave}) => {
    const navigate = useNavigate()
    
  return (
    <div>

<div className="pp">

        {movies.map((movie, index) => (
            <Card key={index} style={{ width: '15rem' }} >
                
      <Card.Img variant="top" 
      src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
       onClick={() => {
              setSelected(movie);
              setModalShow(true);
            
            }}  />
      <Card.Body>
        <Card.Title> {movie.title || movie.name}</Card.Title>
        <Card.Text>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" ,marginTop : "10px", color: "gold" }}>
            <div>
            <FaStar style={{ marginRight: "5px" }} />
            <span>{movie.vote_average?.toFixed(1)}</span>
            </div>
            <Fav  movie={movie} fave={fave}/>
          </div>
          
        </Card.Text>
        <Button   variant="outline-danger" onClick={() => navigate(`/details/${movie.id}`)} >Show Details</Button>
      </Card.Body>
    </Card>
      ))}
      </div>


{/* 
         <div className="pp">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="card"
            onClick={() => {
              setSelected(movie);
              setModalShow(true);
            }}
          >
            <img
              src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
              alt=""
            />
            <h1 style={{ color: "white" }}>
              {movie.title || movie.name}
            </h1>
          </div>
        ))}

      




      </div > */}
    </div>
  )
}

export default Cards