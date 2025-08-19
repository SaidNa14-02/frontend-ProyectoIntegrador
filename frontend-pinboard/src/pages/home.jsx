import React from 'react';
import '../styles/Home.css'
import { MdTour } from "react-icons/md";
// #region Pagina de inicio = home

const Home = () =>{
    return(
        <div className='titulo-home'>
            <MdTour className="tour-icon" />
            <h1>Pinboard rutas seguras</h1>
            <p>Decide por dónde, nosotros te cuidamos.</p>
        </div>
    );
};
// #endregion

export default Home;