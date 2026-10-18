import axios from "axios";
import { useDispatch } from "react-redux";
import { getTopRatedMovie } from "../redux/movieSlice";
import { options, Top_rated_movie } from "../uitils/constant";

const useTopRatedMovies = async () => {
    const dispatch = useDispatch();
    try {
        const res = await axios.get(Top_rated_movie, options);
        dispatch(getTopRatedMovie(res.data.results));
    }
    catch (err) {
        console.log(err);
    }
}

export default useTopRatedMovies