import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Login from './Login.js';
import Browse from './Browse.js';
import MovieDetails from './MovieDetails.js';

const Body=()=>{
const appRouter= createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
       path:"/browse",
       element:<Browse/>

    },
    {
        path:"/movie/:id",
        element:<MovieDetails/>
    }
]);

return(
    <div>
    <RouterProvider router={appRouter}/>
    </div>
)
}

export default Body;