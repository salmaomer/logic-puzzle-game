import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigate from './Navigate';
import './css/Home.css';



export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navigate to="/" />
      <div className="home-container">
        <div className="home-left">
          <h1 className="home-title">Choose Your Game</h1>
          <div className="card-wrapper">
            <div className="card" onClick={() => navigate('/math')}>
              <h2>🧠 Math Game</h2>
              <p>Challenge yourself with logic and numbers!</p>
            </div>
            <div className="card" onClick={() => navigate('/info')}>
              <h2>📚 Information Game</h2>
              <p>Test your general knowledge and trivia skills!</p>
            </div>
          </div>
        </div>

        <div className="home-right">
          <img
            src='/images/HomeImage.png'
            alt="Illustration"
            className="home-image"
          />
        </div>
      </div>
    </>
  );
}
