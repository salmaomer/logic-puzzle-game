import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/InformationGame.css';
import Navigate from '../Navigate';

export default function Questions() {
  const [question, setQuestion] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionKey, setQuestionKey] = useState(0);
  const [time, setTime] = useState(300);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (time <= 0) {
      setIsTimeUp(true);
      return;
    }

    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get('http://localhost:3211/information/api');
        const data = res.data;

        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const selected = data[randomIndex];
          const answers = [...selected.incorrect_answers, selected.correct_answer];
          const shuffled = shuffleArray(answers);

          setQuestion(selected);
          setShuffledAnswers(shuffled);
          setSelectedAnswer(null);
          setIsTimeUp(false);
          setTime(300);
        }
      } catch (error) {
        console.error("Failed to fetch question:", error);
      }
    };

    fetchQuestion();
  }, [questionKey]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleNext = () => setQuestionKey(prev => prev + 1);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const EmojiExplosion = ({ emoji, count = 12 }) => {
    const emojis = Array.from({ length: count });
    return (
      <div className="emoji-explosion">
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

  if (!question) return <p>Loading question...</p>;

  const { category, question: questionText } = question;

  return (
    <>
      <Navigate to="/" />
      <div className="question-page">
        <div className="illustration">
          <img src="/images/QuestionsImage.png" alt="illustration" />
        </div>

        <div className="question-card">
          <div className="timer">⏱ Time: {formatTime(time)}</div>

          <h4 dangerouslySetInnerHTML={{ __html: `Category: ${category}` }} />
          <p dangerouslySetInnerHTML={{ __html: questionText }} className="question-text" />

          <div className="answers">
            {shuffledAnswers.map((answer, index) => {
              const isSelected = selectedAnswer === answer;
              const isCorrect = question.correct_answer === answer;
              const showExplosion = isSelected && selectedAnswer !== null;

              return (
                <div key={index} className="answer-option">
                  <input
                    type="radio"
                    id={`answer-${index}`}
                    name="answer"
                    value={answer}
                    checked={isSelected}
                    disabled={isTimeUp || selectedAnswer !== null}
                    onChange={() => setSelectedAnswer(answer)}
                  />
                  <label
                    htmlFor={`answer-${index}`}
                    dangerouslySetInnerHTML={{ __html: answer }}
                    className="answer-label"
                  />
                  {showExplosion && (
                    <EmojiExplosion emoji={isCorrect ? '🎉' : '❌'} />
                  )}
                </div>
              );
            })}
          </div>

          {isTimeUp && <p className="time-up">⏰ Time's up!</p>}

          <button className="next-btn" onClick={handleNext} disabled={selectedAnswer === null && !isTimeUp}>
            Next Question
          </button>
        </div>
      </div>
    </>
  );
}
