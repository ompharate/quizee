
window.onload = function() {
    var quizAnswersOptions = document.querySelectorAll('.js-quiz-option');
    var quizAnswers = document.getElementById('quiz-answers');

    quizAnswers.addEventListener('change', selectAnswer, false);
    quizAnswers.radioButtons = quizAnswersOptions;

    function selectAnswer() {
        var options = this.radioButtons;
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
}
