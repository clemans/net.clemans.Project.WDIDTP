document.addEventListener("DOMContentLoaded", function () {
  fetch('../data/quiz-data.csv')
      .then(response => response.text())
      .then(data => {
          const quizData = parseCSV(data);
          displayQuiz(quizData);
      });

  function parseCSV(data) {
      const [header, ...rows] = data.trim().split('\n').map(row => row.split(','));
      return rows.map(row => {
          const questionIndex = header.indexOf('question');
          const answerIndex = header.indexOf('answer');
          const options = header.filter(h => h.startsWith('option')).map((_, i) => row[header.indexOf(`option${i + 1}`)]);
          return {
              question: row[questionIndex],
              options: options,
              answer: row[answerIndex].trim()
          };
      });
  }

  function displayQuiz(quizData) {
      const quizContainer = document.getElementById('quiz-container');
      quizData.forEach((item, index) => {
          const questionDiv = document.createElement('div');
          questionDiv.innerHTML = `<p>${item.question}</p>`;
          item.options.forEach(option => {
              const optionButton = document.createElement('button');
              optionButton.innerText = option;
              optionButton.onclick = () => checkAnswer(option, item.answer, index);
              questionDiv.appendChild(optionButton);
          });
          quizContainer.appendChild(questionDiv);
      });
  }

  function checkAnswer(selectedOption, correctAnswer, index) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '';
      if (selectedOption === correctAnswer) {
          const gif = document.createElement('img');
          gif.src = '../assets/images/success.gif';
          gif.className = 'correct';
          resultDiv.appendChild(gif);
          gif.style.display = 'block';
      } else {
          resultDiv.innerHTML = '<p class="wrong">Wrong</p>';
      }
  }
});
