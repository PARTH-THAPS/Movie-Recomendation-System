import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { options } from '../uitils/constant';
import Header from './Header';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          options
        );

        setMovie(res.data);
        console.log(JSON.stringify(res.data));
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, []);

  if (!movie) {
    return <div className="bg-black p-8 text-white">Loading...</div>;
  }

  return (
    <>
      <Header />

      <div className="pt-24 px-6 ">

        <h1 className="text-4xl font-bold mb-4">
          {movie?.title}
        </h1>

        <p className="text-lg mb-4">
          {movie?.overview}
        </p>

        <p className="mb-2">
          Release Date: {movie?.release_date}
        </p>

        <p>
          Rating: {movie?.vote_average}
        </p>

        <p>
          Orgin Country:{movie?.origin_country}
        </p>

        <p>
         Genre: {movie.genres.map((genre)=>{return " "+genre.name })}
        </p>




      </div>
    </>
  );
};

export default MovieDetails;
