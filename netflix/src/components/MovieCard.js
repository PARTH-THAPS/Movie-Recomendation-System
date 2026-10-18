import React from "react"
import { TMDB_IMG_URL } from "../uitils/constant";

const MovieCard=({PosterPath})=>{
return(
     <div className="w-48 pr-2">
          <img src={`${TMDB_IMG_URL}/${PosterPath}`} alt="movie-banner"/>
     </div>
)
}

export default MovieCard;