
window.onload = function() {
    var quizAnswers = document.getElementById('quiz-answers');
    var questionsTotalUi = document.getElementById('questions-total');
    var questionNumberUi = document.getElementById('question-number');
    var nextButton = document.querySelector('.js-next-question');
    var answerBox = document.querySelector('.answer-box');
    var appContainer = document.querySelector('.js-app-container');
    var currentQuestionIndex = 0;
    var userPoints = 0;
    var allQuestions = [
      {question: "Who is the author of The Witcher?", choices: ["Krzysztof Sienkiewicz", "Andrzej Sapkowski", "Tomasz Bagiński", "Adam Mickiewicz"], correctAnswer:1},
      {question: "Is Ciri Gerlat's doughter?", choices: ["Yes", "No"], correctAnswer:1},
      {question: "Who is the creator of The Witcher video games?", choices: ["Techland", "EA", "CD Projekt Red", "People Can Fly"], correctAnswer:2},
      {question: "What is Geralt's mother name?", choices: ["Shani", "Yennefer", "Tris Merigold", " Visenna"], correctAnswer:3},
      {question: "Vizimir was the king of?", choices: ["Redania", "Nilfgaard", "Temeria", " Skellige"], correctAnswer:0},
      {question: "Philippa Eilhart is?", choices: ["Elf", "Sorceress", "Queen"], correctAnswer:1},
      {question: "Who is Geralt's best friend?", choices: ["Jaskier", "Letho", "Vernon Roche", "Rience", "Dijkstra"], correctAnswer:0},
      {question: "Sun is a symbol of?", choices: ["Redania", "Kovir", "Cintra", "Nilfgaard"], correctAnswer:3},
      {question: "Did Triss Merigold die in Sodden battle?", choices: ["Yes", "No"], correctAnswer:1}
    ];

    initForm();

    quizAnswers.addEventListener('change', selectAnswer, false);
    nextButton.addEventListener('click', loadNextQuestion, false);

    function selectAnswer() {
        var options = document.querySelectorAll('.js-quiz-option');
        for (var i = 0; i < options.length;  i++ ) {
            var option = options[i];
            if (option.checked) {
                option.parentElement.classList.add('selected');
            }
            else {
                option.parentElement.classList.remove('selected');
            }
        }
    }

    //Display first question on load
     function initForm() {
       questionsTotalUi.innerHTML = allQuestions.length;
       displayQuestion(currentQuestionIndex);
    }

    function createOption(name, index) {
      var questionLabel = document.createElement('label');
      var questionInput = document.createElement('input');
      var questionIconSpan = document.createElement('span');
      var questionIcon = document.createElement('i');
      questionLabel.className = 'answer-box__label';
      questionInput.className = 'answer-box__option js-quiz-option';
      questionInput.type = 'radio';
      questionInput.name = 'answer';
      questionInput.value = index;
      questionIconSpan.className = 'label-icon';
      questionIcon.className = 'fa fa-check-circle-o';

      questionIconSpan.appendChild(questionIcon);
      questionLabel.appendChild(questionInput);
      questionLabel.appendChild(questionIconSpan);

      quizAnswers.appendChild(questionLabel);
      questionInput.insertAdjacentHTML('afterend', name);
    }

    function setQuestionTitle(title) {
      var questionTitle = document.querySelector('.js-question-title');
      questionTitle.innerHTML = title;
    }

    function displayQuestion(index) {
      var currentQuestion = allQuestions[index];
      var options = currentQuestion.choices;

      questionNumberUi.innerHTML = index + 1;
      setQuestionTitle(currentQuestion.question);

      for (var i = 0; i < options.length; i++) {
        createOption(options[i], i);
      }
    }

    function AnswerNotSelected() {
      var selectedAnswers = document.querySelectorAll('.js-quiz-option:checked');
      if (selectedAnswers.length === 0) {
        alert('Please select an answer');
        return true;
      }
      else {
        return false;
      }
    }

    function countPoints() {
      var userAnswer = document.querySelector('.js-quiz-option:checked').value;
      var correctAnswer = allQuestions[currentQuestionIndex].correctAnswer;
      if (parseInt(userAnswer) === correctAnswer) { userPoints++; }
    }

    function loadNextQuestion() {
      if (AnswerNotSelected()) { return; }
      countPoints();
      answerBox.classList.add('hidden');
      window.setTimeout(function() {
        while (quizAnswers.firstChild) {
          quizAnswers.removeChild(quizAnswers.firstChild);
        }

        currentQuestionIndex++;

        if (currentQuestionIndex === allQuestions.length) {
          displayResult();
        }
        else if (currentQuestionIndex < allQuestions.length) {
          displayQuestion(currentQuestionIndex);
          answerBox.classList.remove('hidden');
        }
      }, 500);
    }

    function displayResult() {
      appContainer.innerHTML = '';

      var resultBox = document.createElement('div');
      var resultHeader = document.createElement('h1');
      var tryAgainBtn = document.createElement('button');

      resultBox.className = 'app-box__result';
      resultHeader.className = 'app-box__result__header';
      tryAgainBtn.className = 'app-box__result__button';
      resultHeader.innerHTML = 'Your score is ' + '<span class="highlight">' + userPoints + '</span>' + ' out of '+ allQuestions.length;
      tryAgainBtn.innerHTML = 'Try again';
      tryAgainBtn.onclick = function(){ window.location.reload(); };

      resultBox.appendChild(resultHeader);
      resultBox.appendChild(tryAgainBtn);
      appContainer.appendChild(resultBox);
    }
};
