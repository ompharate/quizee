window.onload = function() {
  var quizAnswers = document.getElementById('quiz-answers');
  var questionsTotalUi = document.getElementById('questions-total');
  var questionNumberUi = document.getElementById('question-number');
  var nextButton = document.querySelector('.js-next-question');
  var backButton = document.querySelector('.js-previous-question');
  var answerBox = document.querySelector('.answer-box');
  var appContainer = document.querySelector('.js-app-container');
  var questionsLoader = document.querySelector('.js-questions-loader');
  var currentQuestionIndex = 0;
  var userPoints = 0;
  var userChoicesTable = [];
  var allQuestions = [];
  var questionsUrl = 'https://api.myjson.com/bins/4a686';

  fetchQuestions(questionsUrl);

  quizAnswers.addEventListener('change', selectAnswer, false);
  nextButton.addEventListener('click', loadNextQuestion, false);
  backButton.addEventListener('click', loadPreviousQuestion, false);


  function  fetchQuestions(url) {
    var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Please use modern browser :)');
      return false;
    }

    httpRequest.onreadystatechange = addQuizQuestions;
    httpRequest.open('GET', url);
    httpRequest.send();

    function addQuizQuestions() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          allQuestions = JSON.parse(httpRequest.responseText);
          window.setTimeout(initForm, 2000);
        }
        else {
          alert('There was a problem with fetching quiz questions.');
        }
      }
    }
  }
    
  function initForm() {
    questionsTotalUi.innerHTML = allQuestions.length;
    displayQuestion(currentQuestionIndex);
    appContainer.classList.remove('hidden');
    questionsLoader.classList.add('hidden');
  }

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

  function loadNextQuestion() {
    if (AnswerNotSelected())  return;
    countPoints();
    answerBox.classList.add('hidden');

    function loadNextQuestionInside() {
      quizAnswers.innerHTML = '';
      currentQuestionIndex++;

      if (currentQuestionIndex === allQuestions.length) {
        displayResult();
      }
      else if (currentQuestionIndex < allQuestions.length) {
        displayQuestion(currentQuestionIndex);
        answerBox.classList.remove('hidden');
        selectUserAnswer();
      }
    }

    window.setTimeout( loadNextQuestionInside, 500);
  }

  function loadPreviousQuestion() {
    if  (currentQuestionIndex > 0) {
      answerBox.classList.add('hidden');
      window.setTimeout(loadPreviousQuestionInside, 500);
    }
    else {
      alert('This is a first question!');
    }

    function loadPreviousQuestionInside() {
      quizAnswers.innerHTML = '';
      currentQuestionIndex--;
      displayQuestion(currentQuestionIndex);
      answerBox.classList.remove('hidden');
      selectUserAnswer();
    }
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

    // save user Choice
    userChoicesTable[currentQuestionIndex] = userAnswer;
  }

  function selectUserAnswer() {
    var userChoice = userChoicesTable[currentQuestionIndex];
    if (userChoice) {
      var targetAnswer = document.querySelector('.js-quiz-option[value="' + userChoice + '"]');
      targetAnswer.checked = true;
      selectAnswer();
    }
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
