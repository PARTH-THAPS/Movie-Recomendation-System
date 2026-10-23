import React from "react"
import { TMDB_IMG_URL } from "../uitils/constant";
import { useDispatch } from "react-redux";
import { getId, setOpen } from "../redux/movieSlice";
import { FaInfo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const MovieCard = ({ PosterPath, movieId }) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     if (PosterPath == null) return null;
     
     const handleOpen = () => {
          dispatch(setOpen(true));
          dispatch(getId(movieId));
     }

     return (
         

          <div
               className="group relative w-48 shrink-0 cursor-pointer transition-all duration-300 ease-in-out hover:z-20 hover:scale-110"
          >
               <img
                    src={`${TMDB_IMG_URL}/${PosterPath}`}
                    alt="movie-banner"
                    className="w-full rounded-md object-cover"
               />

               <div className="absolute inset-0 flex flex-col justify-end rounded-md bg-gradient-to-t from-black via-black/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">

                    <div className="flex items-center gap-3 text-white">
                         <button
                              onClick={(e) => {
                                   e.stopPropagation();
                                   navigate(`/movie/${movieId}`);
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-gray-300"
                              aria-label="More information"
                         >
                              <FaInfo />
                         </button>

                         <button
                              className="rounded-full border border-white px-3 py-1 text-xs hover:bg-white hover:text-black"
                              onClick={(e) => {
                                   e.stopPropagation();
                                   handleOpen();
                              }}
                         >
                              Play
                         </button>
                    </div>
               </div>
          </div>

     )
}

export default MovieCard;