
/*global $:false */
/** var allQuestions = [
	{
		question: "Who is Prime Minister of the United Kingdom?",
		choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
		correctAnswer: 0
	},
	{
		question: "What's my name?",
		choices: ["Mark", "Ralph", "Apple", "John"],
		correctAnswer: 1
	},
	{
		question: "What food do I like?",
		choices: ["bananas", "eggs", "cookies", "water"],
		correctAnswer: 2
	},
	{
		question: "What team does Kobe Bryant play for?",
		choices: ["Knicks", "Clippers", "Bulls", "Lakers"],
		correctAnswer: 3
	},
	{
		question: "Who is Brad Pitt married to?",
		choices: ["Jessica Alba", "Lady Gaga", "Angelina Jolie", "Beyonce"],
		correctAnswer: 2
	}
]; **/
var allQuestions;
function getQuestions() {
	$.ajax({
		url: 'package.json',
		async: false,
		dataType: 'json',
		success: function(data) {
			allQuestions = data;
		}
	});
	return allQuestions;
}

getQuestions();
var jsonText = JSON.stringify(allQuestions);	//saving this for later just in case I need it

$(function() {
	var score = 0; 		//Initiate 3 variables
	var questionIndex = 0;
	var answers = [];

	function setup(qnum) {		//Sets up question and answers, and if the user checked a radio button, that radio button is checked.
		var question = allQuestions[qnum];
		var questionIndexAnswers = answers[questionIndex];
		if (qnum === 0) {
			$('#back').css('display', 'none');
		}
		else {
			$('#back').css('display', 'inline-block');
		}
		$('fieldset > legend').append(question.question);
		for(var i = 0; i < question.choices.length; i++) {
			$('.questions').append('<label style="display: none"><input name="choices" type="radio" value="'+i+'" />' +question.choices[i]+ '</label>');
		}
		$('label').slideDown(200); 		//Added some animation
		if (questionIndexAnswers !== undefined) {
			var checked = $('input[name="choices"]').get(questionIndexAnswers);
			$(checked).prop('checked', true);
		}
	}

	function calculateScore() {		//lastpage() uses this to calculate the score.
		for (var i = 0; i < answers.length; i++) {
			if (answers[i] === allQuestions[i].correctAnswer) {
				score++;
			}
		}
	}

		function lastpage() {	//This shows the last page and calculates the final score
		calculateScore();
		var yourscore = score + " out of " + allQuestions.length + " correct.";
		if (username) {
			$('body').html("<p class='pagelast'>This is your final score, " + username + ": " + yourscore + "</p>");
		} else {
			$('body').html("<p class='pagelast'>This is your final score: " + yourscore + "</p>");
		}
        $('.pagelast').after('<button id="playAgain">play again<\/button>');
        
        $('#playAgain').on('click', function() {    
        location.reload();    
        });
	}
    

	function addToAnswers() {	//This adds values to the 'answers' array.
		var checkedInput = $('input[name="choices"]:checked');
		answers[questionIndex] = checkedInput.index('input[name="choices"]');
	}

	$("#next").on("click", function() {	//This block executes when the next button is clicked
		var checkedInput = $('input[name="choices"]:checked');

		$('#greeting1').html("<p>Playing as " + username + "."); 	//PLAYING AS USERNAME.

		if (checkedInput.length > 0) {	//This block executes if the user selected a radio button
			$('#submitNameWrap').hide();
			$('.result').hide();
			if (allQuestions[questionIndex].correctAnswer === +checkedInput.val()) {
				$('.right').fadeIn();
			} else {
				$('.wrong').fadeIn();
			}

			addToAnswers();

			$('.questions').empty();
			$('fieldset > legend').empty();

			questionIndex++;

			if (questionIndex < allQuestions.length) {
				setup(questionIndex);
			}
			else {
				lastpage();
			}
		}
		else {	//This executes if the user doesn't select a radio button
			$('.result').fadeOut(1);
			$('.makeChoice').fadeIn();
		}
	});

	$('#back').on('click', function() {
		var checkedInput = $('input[name="choices"]:checked');
		$('.result').fadeOut(1);
		if (checkedInput.length > 0) {
			addToAnswers();
		}
		$('.questions').empty();
		$('fieldset > legend').empty();

		questionIndex--;
		setup(questionIndex);
	});
	setup(0);
});
