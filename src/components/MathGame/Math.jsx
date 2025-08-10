// components/MathGame/Math.jsx

export function generateQuestion(level) {
  let num1, num2, operator, answer;

  // Levels 1-15: Easy (addition, subtraction with small numbers)
  if (level <= 15) {
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;
    operator = Math.random() > 0.5 ? '+' : '-';
  }
  // Levels 16-35: Medium (addition, subtraction, multiplication)
  else if (level <= 35) {
    num1 = Math.floor(Math.random() * 50) + 10;
    num2 = Math.floor(Math.random() * 20) + 1;
    const ops = ['+', '-', '*'];
    operator = ops[Math.floor(Math.random() * ops.length)];
  }
  // Levels 36-50: Hard (multiplication, division with integers)
  else {
    num2 = Math.floor(Math.random() * 12) + 1;
    answer = Math.floor(Math.random() * 20) + 10;
    num1 = answer * num2;
    operator = '/';
  }

  if (!answer) {
    switch (operator) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
    }
  }

  return {
    question: `${num1} ${operator} ${num2}`,
    correctAnswer: answer
  };
}
