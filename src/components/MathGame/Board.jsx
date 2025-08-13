import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MathGame.css';
import  Navigate from '../Navigate.jsx';

export default function Board() {
  const navigate = useNavigate();
  const levels = Array.from({ length: 50 }, (_, i) => i + 1);
  const progress = JSON.parse(localStorage.getItem('mathGameProgress')) || {};

  return (
    <>
      <Navigate to="/Home" />

      <div className="board-main">
        <div className="board-left">
          <h1 className="board-title">The Math Climb 🧠</h1>
          <div className="board-grid">
            {levels.map((level) => {
              const starsCount = progress[level]?.stars || 0;
              return (
                <div
                  key={level}
                  className={`tile ${level % 2 === 0 ? 'ladder' : 'snake'}`}
                  onClick={() => navigate(`/level/${level}`)}
                >
                  <span className="tile-number">Level {level}</span>
                  <div className="stars">
                    {[...Array(starsCount)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Image */}
        <div className="board-right">
          <img
            src="/images/BoardImage.png"
            alt="Illustration"
            className="board-image"
          />
        </div>
      </div>
    </>
  );
}
