import axios from "axios";
import { useDispatch } from "react-redux";
import { options, upcoming_movie } from "../uitils/constant";
import { getUpComingMovies } from "../redux/movieSlice";


const useUpcomingMovie = async () => {
    const dispatch = useDispatch();

    try {
        const res = await axios.get(upcoming_movie, options);
        dispatch(getUpComingMovies(res.data?.results));
    }
    catch (err) {
        console.log(err);
    }

}

export default useUpcomingMovie;