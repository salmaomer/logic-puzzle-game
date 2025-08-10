import './App.css';
import React from 'react';
import Questions from './components/InformationGame/Questions.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Board from './components/MathGame/Board.jsx';
import LevelPage from './components/MathGame/LevelPage.jsx';
import Home from './components/Home.jsx'; 
import Login from './components/Login.jsx'; 
import Register from './components/Register.jsx'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/math" element={<Board />} />
        <Route path="/level/:level" element={<LevelPage />} />
        <Route path="/info" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;
