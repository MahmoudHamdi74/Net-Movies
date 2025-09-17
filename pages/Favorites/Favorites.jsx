// import React from 'react'

// const Favorites = ({fave}) => {
//   return (
//         <div>
//       <h1>My Favorites</h1>
//       <div className="pp">
//         {fave.length === 0 ? (
//           <p>No favorites yet.</p>
//         ) : (
//           fave.map((movie) => (
//             <div key={movie.id} className="card">
//               <img
//                 src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
//                 alt={movie.title}
//               />
//               <h1 style={{ color: "white" }}>{movie.title}</h1>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };


// export default Favorites


import React, { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Context from '../../src/Context/Context';
import Fav from '../../components/Fav/Fav';

const Favorites = () => {
  const {fave}= useContext(Context)

    console.log(fave);
  return (
    <div>
      <h2 className="text-center my-4 text-danger">My Favorite Movies</h2>
      <Row xs={1} md={4} className="g-4">
        {fave.map((movie) => (
          <Col key={movie.id}>
            <Card>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{movie.title || movie.name}</Card.Title>
                <Fav movie={movie} fave={fave} />
                <Link 
                  to={`/details/${movie.id}`} 
                  className="btn btn-danger mt-2 home"
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {fave.length === 0 && (
        <p className="text-center text-danger">No favorite movies yet!</p>
      )}
    </div>
  )
}

export default Favorites