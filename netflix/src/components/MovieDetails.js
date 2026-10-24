import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { options, TMDB_IMG_URL } from '../uitils/constant';
import Header from './Header';
import MovieList from './MovieList';

const ML_API = import.meta.env.VITE_ML_API_URL || 'http://127.0.0.1:8001';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(true);

  useEffect(() => {
    let cancelled = false; // ignore stale responses if the id changes quickly

    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          options
        );
        if (cancelled) return;
        setMovie(res.data);

        // ML service: separate try/catch so it can't break the details page
        try {
          const ml = await axios.get(`${ML_API}/movie/search`, {
            params: { query: res.data.title, tfidf_top_n: 12 },
          });
          if (cancelled) return;

          setSimilar(
            ml.data.tfidf_recommendations
              .map((r) => r.tmdb)
              .filter(Boolean)
              .map((m) => ({
                id: m.tmdb_id,
                title: m.title,
                poster_path: m.poster_url
                  ? m.poster_url.replace(
                      /^https:\/\/image\.tmdb\.org\/t\/p\/w\d+/,
                      ''
                    )
                  : null,
                release_date: m.release_date,
                vote_average: m.vote_average,
              }))
          );
        } catch (err) {
          console.error('Error fetching similar movies:', err);
          if (!cancelled) setSimilar([]);
        } finally {
          if (!cancelled) setSimilarLoading(false);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        if (!cancelled) setSimilarLoading(false);
      }
    };

    setSimilar([]);
    setSimilarLoading(true);
    fetchMovieDetails();

    return () => {
      cancelled = true;
    };
  }, [id]); // re-fetch when the movie id changes

  if (!movie) {
    return <div className="bg-black p-8 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="relative h-64 w-full bg-gray-800">
        {movie.backdrop_path && (
          <img
            src={`${TMDB_IMG_URL}${movie.backdrop_path}`}
            alt=""
            className="h-full w-full object-cover opacity-60"
          />
        )}

        {movie.poster_path && (
          <img
            src={`${TMDB_IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            className="absolute left-1/2 bottom-[-60px] -translate-x-1/2
                       w-32 h-48 object-cover rounded-lg shadow-xl"
          />
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-20 pb-10">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p className="mb-4">{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>Genre: {movie.genres?.map((genre) => genre.name).join(', ')}</p>
      </div>

      <div className="px-10 py-6">
        <h2 className="text-3xl font-bold mb-4">Recommendation</h2>

        {similarLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-52 w-36 shrink-0 animate-pulse rounded-lg bg-gray-800"
              />
            ))}
          </div>
        ) : similar.length === 0 ? (
          <p className="text-gray-400">No Similar Movies Found.</p>
        ) : (
          <MovieList title="Similar Movies" movies={similar} />
        )}
      </div>
    </div>
  );
};

export default MovieDetails;