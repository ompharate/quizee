
window.onload = function() {
    var quizAnswers = document.getElementById('quiz-answers');
    var allQuestions = [
      {question: "Who is the author of The Witcher?", choices: ["Krzysztof Sienkiewicz", "Andrzej Sapkowski", "Tomasz Bagiński", "Adam Mickiewicz"], correctAnswer:1},
      {question: "Is Ciri Gerlat's doughter?", choices: ["Yes", "No"], correctAnswer:0},
      {question: "Who is the creator of The Witcher video games?", choices: ["Techland", "EA", "CD Projekt Red", "People Can Fly"], correctAnswer:3},
      {question: "What is Geralt's mother name?", choices: ["Shani", "Yennefer", "Tris Merigold", " Visenna"], correctAnswer:4},
      {question: "What is Geralt's mother name?", choices: ["Shani", "Yennefer", "Tris Merigold", " Visenna"], correctAnswer:4},
      {question: "Vizimir was the king of?", choices: ["Radania", "Nilfgaard", "Temeria", " Skellige"], correctAnswer:0},
      {question: "Philippa Eilhart is?", choices: ["Elf", "Sorceress", "Queen"], correctAnswer:1},
      {question: "Who is Geralt's best friend?", choices: ["Jaskier", "Letho", "Vernon Roche", "Rience", "Dijkstra"], correctAnswer:0},
      {question: "Sun is a symbol of?", choices: ["Redania", "Kovir", "Cintra", "Nilfgaard"], correctAnswer:4},
      {question: "Did Triss Merigold die in Sodden battle?", choices: ["Yes", "No"], correctAnswer:1}
    ];

    initForm();

    quizAnswers.addEventListener('change', selectAnswer, false);

    function selectAnswer() {
        var options = document.querySelectorAll('.js-quiz-option');
        for (var i = 0; i < options.length;  i++ ) {
            var option = options[i];
            if (option.checked) {
                option.parentElement.classList.add('active');
            }
            else {
                option.parentElement.classList.remove('active');
            }
        }
    }

    //Display first question on load
     function initForm() {
       var firstQuestion = allQuestions[0];
       var options = firstQuestion.choices;
       setQuestionTitle(firstQuestion.question);
       for (var i = 0; i < options.length; i++) {
         createOption(options[i]);
      }
    }

    function createOption(name) {
      var questionLabel = document.createElement('label');
      var questionInput = document.createElement('input');
      var questionIconSpan = document.createElement('span');
      var questionIcon = document.createElement('i');
      questionLabel.className = 'answer-box__label';
      questionInput.className = 'answer-box__option js-quiz-option';
      questionInput.type = 'radio';
      questionInput.name = 'answer';
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
};
