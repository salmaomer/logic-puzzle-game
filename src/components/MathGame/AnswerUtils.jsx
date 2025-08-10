
export function checkAnswer(userAnswer, correctAnswer) {
  return parseInt(userAnswer) === parseInt(correctAnswer);
}

export function saveProgress(level, stars = 3) {
  const progress = JSON.parse(localStorage.getItem('mathGameProgress')) || {};
  progress[level] = { stars };
  localStorage.setItem('mathGameProgress', JSON.stringify(progress));
}
