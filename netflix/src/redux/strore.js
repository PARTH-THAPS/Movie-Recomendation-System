import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";

const store = configureStore({
    reducer: {
        app: userReducer,
        movie:movieReducer
    }
});

export default store;