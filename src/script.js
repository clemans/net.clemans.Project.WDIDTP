let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let attempts = 0;
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

export async function fetchQuestions() {
  const response = await fetch('./data/questions.csv');
  const data = await response.text();
  questions = data
    .trim()
    .split('\n')
    .slice(1)
    .map((line) => {
      const [question, correct, a, b, c, d] = line.split(',');
      return { question, correct, options: { a, b, c, d } };
    });
  displayQuestion(question);
}

export function getRandomOptions(correctOption) {
  const otherOptions = questions
    .flatMap((q) => Object.values(q.options))
    .filter((option) => option !== correctOption);
  const randomOptions = [];
  while (randomOptions.length < 3) {
    const randomOption =
      otherOptions[Math.floor(Math.random() * otherOptions.length)];
    if (!randomOptions.includes(randomOption)) {
      randomOptions.push(randomOption);
    }
  }
  return randomOptions;
}

export function displayQuestion(question) {
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const celebrationElement = document.getElementById('celebration');
  const gameOverElement = document.getElementById('game-over');

  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0;
  }

  const currentQuestion = questions;
  console.log(question);
  return question;
}