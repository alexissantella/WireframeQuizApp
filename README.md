### Boilerplate app structure for Quiz App project

function renderQA(){ //Render current question and matching answers to the form
	var currentQ = STORE.currentQ;
	$('#count').text('Question '+currentQ+' of '+(STORE.questions.length-2)); // Render question count
	$('#question').text(STORE.questions[currentQ].q); // Render question as form legend text
	$('#result').hide(); // Hide result DIV
	initSelection();	// Select first radio button

	if(currentQ == 0){ // INTRO
		$('#count').css('visibility', 'hidden');
		STORE.questions[currentQ].a.forEach(function(answer, index){ // Render answers to radio labels
			var introHTML = `<p>${answer}</p>`;
			$('#intro').append(introHTML);
		});
		$('.radio-item').hide();
		$('#button-submit').show().text('Begin');
		$('#button-continue').hide();
	}
	else if(currentQ == 11){ // END
		$('#count').css('visibility', 'hidden');
		getResults();
		for (i = 1; i < STORE.questions.length-1; i++){ // Render answers to radio labels
				var results = {
					n: i,
					q: STORE.questions[i].q,
					c: STORE.questions[i].a[STORE.questions[i].c],
					u: STORE.questions[i].a[STORE.questions[i].u],
					r: STORE.questions[i].r
				}
			var resultsHTML = `<p class="results-p"><span class="results-number">${results.n}.</span> <span class="results-question">${results.q}</span><br>Correct Answer: <span class="results-correct">${results.c}</span><br>Your Answer: <span class="results-user">${results.u}</span><br>Result: <span class="results-result">${results.r}</span></p>`;
			$('.radio-item').hide();
			$('#end-results').hide();
			$('#end-results').append(resultsHTML);
			$('#end-results').fadeIn();
			$('#button-submit').show().text('Restart');
			$('#button-continue').hide();
		};
	}
	else{
		$('#count').css('visibility', 'visible');
		$('#intro').hide();
		$('.radio-item').fadeIn();
		STORE.questions[currentQ].a.forEach(function(answer, index){ // Render answers to radio labels
			$('label[for="answer-'+index+'"]').text(answer);
		});
		$('#button-submit').show().text('Submit');
		$('#button-continue').hide();
	}
	console.log('CurrentQ is: '+currentQ);
} 

function initSelection(){ // CHECK FIRST RADIO AND GET IT AS THE CURRENT ANSWER
	$('input[type=radio]:first').prop('checked', true);
	getUserAnswer();
}

function startListeners(form){ // LISTEN TO FORM FOR ANSWER SELECTION AND SUBMIT
	form.on('change','input[type=radio]', getUserAnswer)
		.on('submit', handleSubmit);
}

function getUserAnswer(event){ // This gets the checked radio and stores it
	STORE.currentUserAnswer = Number($('input:checked').val());
	return STORE.currentUserAnswer;
}

function handleSubmit(event){ //When a fool smashes dat SUBMIT, please do the following
	event.preventDefault();

	if(STORE.currentQ == 11 ){ // If at end, submit will reload entire quiz
		console.log('RESTART');
		window.location.href='';
	}
	else if(STORE.currentQ == 0){
		console.log('BEGIN');
		renderQA(STORE.currentQ += 1); //Renders the new current page (next page)
	}
	else{
		console.log('SUBMIT');
		storeUserAnswer(getUserAnswer());
		checkUserAnswer(getUserAnswer());
	}
}

function storeUserAnswer(answer){ // Push stored User Answer into the answerHistory array
	STORE.questions[STORE.currentQ].u = answer;
}	

function checkUserAnswer(userAnswer){ // check answer and push true if correct, false if incorrect
	if(STORE.currentQ == 10){ // Any answer is correct for question 10
		STORE.questions[10].a.push('Any'); // Push a new answer 'Any'
		STORE.questions[10].c = 4;	// Ensure correct answer will be 'Any'
		console.log('CORRECT!');
		displayResult('CORRECT!');
	}
	else if(userAnswer == STORE.questions[STORE.currentQ].c){
		STORE.questions[STORE.currentQ].r = 'Correct';
		console.log('CORRECT!');
		$('#result').removeClass('incorrect').addClass('correct');
		displayResult('CORRECT!')
	}
	else {
		STORE.questions[STORE.currentQ].r = 'Incorrect';
		console.log('YA BLEW IT!');
		$('#result').removeClass('correct').addClass('incorrect');
		displayResult('YA BLEW IT!')
	}
}

function displayResult(result){ // Show if User Answer is correct or not
	$('.radio-item').hide();
	$('#button-submit').hide();
	$('#result').fadeIn();
	$('#result > p').text(result);
	$('#button-continue').show().unbind('click').click(function(e){
		e.preventDefault();
		console.log('currentq +1')
		renderQA(STORE.currentQ += 1); //Renders the new current page (next page)

	});
}

function getResults(){ // Match each user answer with appropriate question
	var resultsArray=[];
	for(i = 1 ; i < STORE.questions.length-1; i++){
		var question = STORE.questions[i].q;
		var answerNum = STORE.questions[i].u;
		var answerStr = STORE.questions[i].a[answerNum];
		resultsArray.push( {q:question, a:answerStr} );
	}
	return STORE.questions[11].a = resultsArray;
}

$(function(){ //DOCUMENT READY!
	renderQA();
	startListeners($('form'));
	$('.no-fouc').removeClass('no-fouc');
});