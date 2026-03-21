import React from "react";
import { useParams } from 'react-router';
import { getMovieCredits } from '../../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';


function MovieCredits() {
  const { id } = useParams();
  const { data: credits, error, isPending, isError  } = useQuery({
    queryKey: ['movieCredits', {id}],
    queryFn: getMovieCredits,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {credits?.cast.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>

      <h2>Crew</h2>
      <ul>
        {credits?.crew.map((person) => (
          <li key={person.id}>{person.name} - {person.job}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCredits;