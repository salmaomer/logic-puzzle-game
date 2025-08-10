// components/MathGame/LevelTile.jsx
import React from 'react';
import '../css/MathGame.css';

export default function LevelTile({ level, locked, stars = 0, difficulty, onClick }) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'easy';
      case 'medium': return 'medium';
      case 'hard': return 'hard';
      default: return '';
    }
  };

  return (
    <div
      className={`level-tile ${locked ? 'locked' : getDifficultyColor()}`}
      onClick={!locked ? () => onClick(level) : null}
    >
      <span className="level-number">{level}</span>
      <div className="stars">
        {Array.from({ length: stars }).map((_, i) => <span key={i}>⭐</span>)}
      </div>
    </div>
  );
}
