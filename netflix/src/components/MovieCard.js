import React from "react"
import { TMDB_IMG_URL } from "../uitils/constant";
import { useDispatch } from "react-redux";
import { getId, setOpen } from "../redux/movieSlice";

const MovieCard=({PosterPath,movieId})=>{
     const dispatch =useDispatch();
     if(PosterPath==null) return null;

const handleOpen=()=>{
dispatch(setOpen(true));
dispatch(getId(movieId));

}

return(
     <div className="w-48 pr-2" onClick={handleOpen}>
          <img src={`${TMDB_IMG_URL}/${PosterPath}`} alt="movie-banner"/>
     </div>
)
}

export default MovieCard;