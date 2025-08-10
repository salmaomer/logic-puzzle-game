import React from 'react';
import '../css/InformationGame.css';

export default function AnswerChecker({ correctAnswer, selectedAnswer }) {
  if (!selectedAnswer) return null; 

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="answer-feedback">
      {isCorrect ? (
        <p style={{ color: 'green' }}>✅ Correct!</p>
      ) : (
        <p style={{ color: 'red' }}>
          ❌ Wrong! The correct answer is: <strong dangerouslySetInnerHTML={{ __html: correctAnswer }} />
        </p>
      )}
    </div>
  );
}
