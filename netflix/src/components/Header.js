import React from 'react'

const Header=()=>{
    return(
        <div className="flex-w-[100%] items-center justify-between bg-gradient-to-t from-black">
       <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhj-w0fx_8l8vEgDbIJN1iPEwRoEBU8nPEQ&s" alt="netflix-logo"/>
       
        <div>
            <h1>Parth Mern Stack </h1>
            <button>Logout</button>
            <button>Search Movie</button>
        </div>

        </div>

    )
}
export default Header;
