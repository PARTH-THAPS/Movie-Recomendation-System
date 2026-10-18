import axios from "axios";
import { getNowPlayingMovies } from "../redux/movieSlice";
import { Now_Playing_Movies, options } from "../uitils/constant";
import { useDispatch } from "react-redux";

  
  const useNowPlayingMovies=async ()=>{
    const dispatch= useDispatch();
      try{
        const res = await axios.get(Now_Playing_Movies,options);
        console.log(res.data.results);
        dispatch(getNowPlayingMovies(res.data.results));
      } 
      catch(err)
      {
          console.log(err);
      }

    }

    export default useNowPlayingMovies;