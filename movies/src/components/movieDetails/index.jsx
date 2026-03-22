import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, credits, recommendations, watchProviders }) => {  // Don't miss this!
const [drawerOpen, setDrawerOpen] = useState(false);


  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>


      <Paper 
      component="ul" 
      sx={{ ...root }}>

        <li>
            <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
        </li>

        {movie.production_countries?.map((country) => (
            <li key={country.name}>
            <Chip label={country.name} sx={{ ...chip }} />
            </li>
        ))}

        </Paper>

      <Typography variant="h5" component="h3">
        Cast
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Cast" sx={{...chip}} color="primary" />
        </li>
        {credits?.cast.map((actor) => (
          <li key={actor.cast_id}>
            <Link to={`/actors/${actor.id}`} style={{ textDecoration: 'none' }}>
              <Chip label={`${actor.name} as ${actor.character}`} sx={{...chip}} clickable />
            </Link>
          </li>
        ))}
      </Paper>

      <Typography variant="h5" component="h3">
        Crew
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Crew" sx={{...chip}} color="primary" />
        </li>
        {credits?.crew.map((person) => (
          <li key={person.credit_id}>
            <Chip label={`${person.name} - ${person.job}`} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      <Typography variant="h5" component="h3">
        Recommendations
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Recommendations" sx={{...chip}} color="primary" />
        </li>
      
        {recommendations?.results.map((rec) => (
          <li key={rec.id}>
            <Link to={`/movies/${rec.id}`} style={{ textDecoration: 'none' }}>
            <Chip label={rec.title} sx={{...chip}} />
            </Link>
          </li>
        ))}
      </Paper>

      <Typography variant="h5" component="h3">
        Where to Watch
      </Typography>
      <Paper
        component="ul"
        sx={{ ...root }}
      >
        <li>
          <Chip label="Watch Providers" sx={{ ...chip }} color="primary" />
        </li>
        {watchProviders?.results?.IE?.flatrate?.map((provider) => (
          <li key={provider.provider_id}>
            <Chip label={provider.provider_name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
  

      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      </>
  );
};


export default MovieDetails ;

