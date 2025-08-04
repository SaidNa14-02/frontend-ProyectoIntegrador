import React from 'react';
import '../styles/Home.css'
import { MdTour } from "react-icons/md";
// #region Pagina de inicio = home

const Home = () =>{
    return(
        <div className='titulo-home'>
            <MdTour className="tour-icon" />
            <h1>Pinboard rutas seguras</h1>
        </div>
    );
};
// #endregion

export default Home;