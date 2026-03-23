import React from "react";
import { useParams } from 'react-router';
import { getPerson, getPersonMovies } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import { Link } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";


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
    <Box sx={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
    
      <Box sx={{ display: 'flex', gap: 3 , mb: 3 }}>
        <img 
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} 
          alt={actor.name} 
          style={{ width: '200px', height: '300px', borderRadius: '8px' }} 
        />

        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {actor.name}
          </Typography>
          {actor.birthday && <Chip label={`Born: ${actor.birthday}`} color="primary" sx={{ mb: 1 }} />}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            {actor.biography || "No biography available."}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Known For
        </Typography>
        {movies?.cast.slice(0, 10).map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
              <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
                {movie.title}
              </Typography>
            </Link>
        ))}
    </Box>
  );
};

export default ActorPage;
