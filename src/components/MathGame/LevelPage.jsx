import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateQuestion } from './Math';
import { checkAnswer, saveProgress } from './AnswerUtils';
import Navigate from '../Navigate';
import '../css/MathGame.css';

// 🎉 or ❌ EmojiExplosion Component
const EmojiExplosion = ({ emoji, count = 12 }) => {
  const emojis = Array.from({ length: count });
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {emojis.map((_, i) => {
        const left = Math.random() * 90 + '%';
        const top = Math.random() * 80 + '%';
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left,
              top,
              fontSize: '1.5rem',
              userSelect: 'none',
              animation: 'floatUp 2s ease forwards',
              opacity: 0.8,
            }}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
};

export default function LevelPage() {
  const { level } = useParams();
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState('');
  const [explosionEmoji, setExplosionEmoji] = useState(null);

  useEffect(() => {
    setQuestionData(generateQuestion(parseInt(level)));
  }, [level]);

  const handleSubmit = () => {
    if (checkAnswer(userAnswer, questionData.correctAnswer)) {
      saveProgress(level, 3);
      setExplosionEmoji('🎉');
    } else {      
      setExplosionEmoji('❌');
    }

    setTimeout(() => setExplosionEmoji(null), 2000);
  };

  return (
    <>
      <Navigate to="/" />
      <div className="level-page-container">
        <div className="level-image">
          <img
            src="/images/LevelPageImage.png"
            alt="Question illustration"
          />
        </div>

        <div className="level-content" style={{ position: 'relative', overflow: 'hidden' }}>
          {explosionEmoji && <EmojiExplosion emoji={explosionEmoji} count={20} />}

          <h2 className="level-title">Level {level}</h2>
          {questionData ? (
            <>
              <p className="question-text">
                Solve: <strong>{questionData.question}</strong>
              </p>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="answer-input"
              />
              <button onClick={handleSubmit} className="submit-button">
                Submit Answer
              </button>
              <p className="result-message">{result}</p>
            </>
          ) : (
            <p className="loading-text">Loading question...</p>
          )}
          <button onClick={() => navigate('/math')} className="back-button">
            ⬅ Back to Board
          </button>
        </div>
      </div>
    </>
  );
}
