import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TryNow from './TryNow.js';
import Home from './Home.js';
import './App.css';

const App = () => {


  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/TryNow" element={<TryNow />} />
      </Routes>
    </Router>

  );
};

export default App;
