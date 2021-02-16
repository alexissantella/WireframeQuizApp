/**
 * Example store structure
 */
/*const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};*/

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//document.documentElement.className = 'no-fouc'; // To prevent FOUC! - see the document ready for more

const store = {
  // 5 or more questions are required
  questions: [
    { // Question 1
      question: 'What planet is the fastest in our solar system? This planet zips around our sun at an average of 107,000 miles per hour, about 40,000 mph faster than earth.',
      answers: [
        'Jupiter',
        'Neptune',
        'Mercury',
        'Mars'
      ],
      correctAnswer: 'Neptune'
    },
    { // Question 2
      question: 'How many Earths could you fit into Jupiter?',
      answers: [
        '2,300',
        '500',
        '800',
        '1,300'
      ],
      correctAnswer: '1,300'
    },
    { // Question 3
      question: 'Which planets winds are the fastest in the solar system? These winds reach 1,600 miles per hour, meaning these giant spinning storms could swallow the whole Earth.',
      answers: [
        'Jupiter',
        'Neptune',
        'Venus',
        'Mars'
      ],
      correctAnswer: 'Neptune'
    },
    { // Question 4
      question: 'The radio signal that a spacecraft uses to contact Earth has no more power than a ___ . And by the time the signal has traveled across space it is only measured at one-billionth of one-billionth of one watt.',
      answers: [
        'Refrigerator light bulb',
        'Computer mouse',
        'Cell phone',
        'Alarm clock'
      ],
      correctAnswer: 'Refrigerator light bulb'
    },
    { // Question 5
      question: 'The Largest canyon system in the solar system is Valles Marineris. It is more than 3,000 miles long and would stretch from California to New York. It is nine times as long and four times as deep as Earths Grand Canyon. Where is it?',
      answers: [
        'Saturn',
        'Jupiter',
        'Uranus',
        'Mars'
      ],
      correctAnswer: 'Mars'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  submittingAnswer: false,
  score: 0,

  currentQuestionState: {
    answerArray: []
  }
};


function generateWelcomeString() {
  return `
  <div class="Welcome">
    <form>
      <p>
        Welcome let\'s see if you know the unknown. Pay attention and don\'t space out. 
      </p>
      <p>
        Have fun and may the force be with you!
      </p>
      <button type="submit" class="beginQuiz" autofocus>Begin Quiz</button>
    </form>
  </div>
    `;
}

function generateQuizInterfaceString(questionObject) {
  // console.log(questionObject);
  // console.log(questionObject.question.answers);
  return `
    <div class='quiz-interface'>
      <p class='outOf'>Question ${questionObject.index} out of ${store.questions.length}</p>
      <p>
       ${questionObject.question.question}
      </p>

      <form>
      <ol style="list-style-type:none;">
        ${generateQuizAnswers(questionObject.question.answers)}
      </ol>
      <button type="submit" class="submit-answer">Submit Answer</button>
      </form> 
      <p>Score: ${store.score}</p>
    </div>
    `;
}


function generateAnswerResults() {
  let answerArray = store.currentQuestionState.answerArray;

  const buttons = {
    next: ' <button type="submit" class="next-question" autofocus>Next Question</button>',
    results: '<button type="submit" class="see-results" autofocus>See Results</button>'
  };

  let correctResponse = `"${answerArray[1]}" is correct`;
  let incorrectResponse = `${answerArray[2]} is not correct. The correct answer is<br><br>
  <p  class="white-text">"${answerArray[1]}"</p>`;

  let isLastQuestion = (store.questionNumber + 1) === (store.questions.length);

  return `
    <div class="answer-response">
    <form>
    <p>${answerArray[0] === true ? correctResponse : incorrectResponse}</p>
    <p> Score: ${store.score}</p>
   ${isLastQuestion ? buttons.results : buttons.next}
    </form>
    </div>
  `;
}


function generateQuizAnswers(answers) {
  let answerArray = [];
  let indexArray = [];
  answers.forEach(answer => {
    answerArray.push(answer);
    indexArray.push(answers.indexOf(answer));
  });
  console.log(indexArray);
  return answerArray.map(answer => stringifyAnswerArray(answer)).join('');
}

function stringifyAnswerArray(answer) {
  let questionNumber = store.questionNumber;
  let name = store.questions[questionNumber].answers.indexOf(answer);
  console.log(name);

  return `
    <li>
      <div class="answer-container">
      <input type="radio" name="answer" id="answer-${name}" data-answer="${answer}">
      <label for="answer-${name}"> ${answer}</label>
     
      </div>
    </li>
  `;
}

function generateQuizResultsString() {
  return `
    <div class='quiz-results'>
      <p>
       Done. Great job, you're out of this world!
      </p>
          <p class="pink-text">You scored ${store.score} out of ${store.questions.length * 10}</p>            
        <button class="restart-quiz">Restart Quiz</button>      
    </div>   
  `;
}


/********** RENDER FUNCTION(S) **********/

function renderQuiz() {

  if (store.quizStarted === false) {
    if (store.questionNumber === store.questions.length) {
      const quizResultsString = generateQuizResultsString();
      $('main').html(quizResultsString);
    } else {
      const quizWelcomeInterfaceString = generateWelcomeString();
      $('main').html(quizWelcomeInterfaceString);
    }
  } else if (store.quizStarted === true) {
    if (store.submittingAnswer === false) {
      const quizInterfaceString = generateQuizInterfaceString(currentQuestion());
      $('main').html(quizInterfaceString);
    } else if (store.submittingAnswer === true) {
      const quizAnswerResponseString = generateAnswerResults();
      $('main').html(quizAnswerResponseString);
    }
  }
}


// Changes the state of the application to a quizStarted = true
function startQuiz() {
  console.log('quiz has begun');
  store.quizStarted = true;
}

// currentQuestion
function currentQuestion() {
  let index = store.questionNumber;
  let questionObject = store.questions[index];
  return {
    index: index + 1,
    question: questionObject
  };
}

// Go to the next question of the quiz
// Model function changes state
function nextQuestion() {
  if (store.questionNumber < store.questions.length) {
    store.questionNumber++;
    store.submittingAnswer = false;
    console.log(store.questionNumber);
  } else if (store.questionNumber === store.questions.length) {
    store.quizStarted = false;
  }
}


function validateCorrectAnswer() {
  let radios = $('input:radio[name=answer]');
  let selectedAnswer = $('input[name="answer"]:checked').data('answer');
  let questionNumber = store.questionNumber;
  let correctAnswer = store.questions[questionNumber].correctAnswer;

  if (radios.filter(':checked').length === 0) {
    alert('Please select an answer.');
    return;
  } else {
    store.submittingAnswer = true;
    if (selectedAnswer === correctAnswer) {
      store.score += 10;
      store.currentQuestionState.answerArray = [true, correctAnswer, selectedAnswer];
    } else {
      store.currentQuestionState.answerArray = [false, correctAnswer, selectedAnswer];
    }
  }
}

function seeResults() {
  store.quizStarted = false;
  store.questionNumber++;
}

function restartQuiz() {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.submittingAnswer = false;
  store.currentQuestionState.answerArray = [];
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)
// Controller layer

function handleBeginQuizSubmit() {

  $('main').on('click', '.beginQuiz', (event) => {
    event.preventDefault();
    startQuiz();
    renderQuiz();
  });
}

function handleSubmitAnswer() {
  $('main').on('click', '.submit-answer', (event) => {
    event.preventDefault();
    console.log('submitting answer');
    validateCorrectAnswer();
    renderQuiz();
  });
}

function handleNextQuestionSubmit() {
  $('main').on('click', '.next-question', (event) => {
    event.preventDefault();
    nextQuestion();
    renderQuiz();
  });
}

function handleSeeResultsSubmit() {
  $('main').on('click', '.see-results', (event) => {
    event.preventDefault();
    seeResults();
    renderQuiz();
  });
}

function handleRestartQuizSubmit() {
  $('main').on('click', '.restart-quiz', (event) => {
    event.preventDefault();
    restartQuiz();
    renderQuiz();
  });
}


// This function will launch all other functions after the page is loaded
function handleQuiz() {
  renderQuiz();
  handleBeginQuizSubmit();
  handleSubmitAnswer();
  handleNextQuestionSubmit();
  handleRestartQuizSubmit();
  handleSeeResultsSubmit();

}

$(handleQuiz);