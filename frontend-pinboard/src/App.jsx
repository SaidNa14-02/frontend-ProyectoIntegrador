import React from 'react';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
// import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = ()=> {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/about" element={<About/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;