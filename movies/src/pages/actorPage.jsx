import React from "react";
import { useParams } from 'react-router';
import { getPerson, getPersonMovies } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import { Link } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const ActorPage = () => {
  const { id } = useParams();

  const { data: actor, error, isPending, isError  } = useQuery({
    queryKey: ['actor', { id }],
    queryFn: getPerson,
  })

  const { data: movies, error: moviesErrorMessage, isPending: moviesPending, isError: moviesError  } = useQuery({
    queryKey: ['actorMovies', { id }],
    queryFn: getPersonMovies,
  })


  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (moviesPending) {
    return <Spinner />;
  }

  if (moviesError) {
    return <h1>{moviesErrorMessage.message}</h1>;
  }

  

  return (
    <>
      <Box sx={{ display: 'flex', gap: 3 , mb: 3 }}>
        <img 
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} 
          alt={actor.name} 
          style={{ width: '200px', borderRadius: '8px' }} 
        />

        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {actor.name}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          {actor.biography || "No biography available."}
        </Typography>
      </Box>

        <h2>Movies</h2>
        {movies?.cast.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
                <p>{movie.title}</p>
            </Link>
        ))}

    </>
  );
};

export default ActorPage;
