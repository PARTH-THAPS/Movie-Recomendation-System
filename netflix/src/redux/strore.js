import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        app: userReducer
    }
});

export default store;