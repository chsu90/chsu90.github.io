var question = 1,
	correctAnswerCount = 0,
	wasAnswerCorrect = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false,
		11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false},
	selected = {1: -1, 2: -1, 3: -1, 4: -1, 5: -1, 6: -1, 7: -1, 8: -1, 9: -1, 10: -1,
		11: -1, 12: -1, 13: -1, 14: -1, 15: -1, 16: -1, 17: -1, 18: -1, 19: -1, 20: -1},
	allQuestions = [];

function restart() {
	correctAnswerCount = 0;
	wasAnswerCorrect = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false,
		11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false};
	selected = {1: -1, 2: -1, 3: -1, 4: -1, 5: -1, 6: -1, 7: -1, 8: -1, 9: -1, 10: -1,
		11: -1, 12: -1, 13: -1, 14: -1, 15: -1, 16: -1, 17: -1, 18: -1, 19: -1, 20: -1};
	$('.nav li').removeClass('active');
}

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



function setActiveNav(number) {
	if (number == 1) {
		$('.nav li:nth-child(1)').addClass('active');
	}
	if (number == 2) {
		$('.nav li:nth-child(2)').addClass('active');
	}
	if (number == 3) {
		$('.nav li:nth-child(3)').addClass('active');
	}
	if (number == 4) {
		$('.nav li:nth-child(4)').addClass('active');
	}
};

