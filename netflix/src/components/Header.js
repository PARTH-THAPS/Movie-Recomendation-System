import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { API_END_POINT } from '../uitils/constant';
import { setUser } from '../redux/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';   // + useLocation
import toast from 'react-hot-toast';
import { setToggle } from '../redux/movieSlice';

const Header = () => {
    const user = useSelector((store) => store.app.user);
    const toggle = useSelector((store) => store.movie.toggle);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();                       

    const isOnMoviePage = pathname.startsWith('/movie/');    

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}logout`);
            if (res.data.success) {
                toast.success(res.data.message);
            }
            dispatch(setUser(null));
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const toggleHandler = () => {
        if (isOnMoviePage) {
            
            if (toggle) dispatch(setToggle()); 
            navigate('/browse');
            return;
        }
        dispatch(setToggle());
    };

    // On the details page the button should always say "Home"
    const buttonLabel = isOnMoviePage ? "Home" : (toggle ? "Home" : "Search Movie");

    return (
        <div className="absolute z-10 flex w-full items-center justify-between px-6 bg-gradient-to-b from-black">
            <img className='w-56' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="netflix-logo" />
            {user && (
                <div className="flex items-center">
                    <IoIosArrowDropdown size="24px" color="white" />
                    <h1 className="text-lg font-medium text-white">{user.fullname}</h1>
                    <div className="ml-4">
                        <button onClick={logoutHandler} className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                            Logout
                        </button>

                        <button onClick={toggleHandler} className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md ml-2">
                            {buttonLabel}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;