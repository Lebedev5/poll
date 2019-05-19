function Question(ques, variants, truth){
	this.ques = ques || 'Choose some variant';
	this.variants = (variants === undefined || variants.length == 0) ?
						[1, 2, 3, 4]:
					(variants.length == 1) ? 
						variants.concat([2, 3, 4]):
					(variants.length == 2) ?
						variants.concat([3, 4]):
					(variants.length == 3) ?
						variants.concat([4]):
							variants;
	this.truth = (truth) ? //if number is 
					(truth < 4) ? //if number less than 4
						(truth > -1) ? //and bigger than -1
							truth: // then this number will be returned
						0: // if number less than 0 then 0
					3: // if number bigger than 3 then 3
				0; //standart value
	this.toString = function(){
		return 'Question is "' + this.ques + '"\nVariants are "' + this.variants + '"\nTrue variant has number ' + (this.truth + 1); 
		//it was done to easy debag is console with compression to string
	}
	this.valueOf = function(){
		return this.truth;
	}
}

function updatePoll(obj){

	const ques = document.getElementById('question');

	ques.textContent = obj.ques;

	for (let i = 0; i < variants.length; ++i){
		variants[i].querySelector('span').textContent = obj.variants[i];
		variants[i].querySelector('input').checked = false;
	}

}

document.ondragstart = null;

let questions = [], currentQuestion = -1, rightVariants = 0;
const nextButton = document.getElementById('next'),
	  variants = document.getElementsByClassName('variant');

for (let i = 0; i < variants.length; ++i){
	variants[i].onclick = function(){
		nextButton.style.display = "flex";
	}
}

nextButton.onclick = function(){
	this.style.display = "none"; //while guy won't choose the variant button won't be enabled


	if (currentQuestion + 1 == questions.length - 1){ //if number of question equal to count of questions - 1
		this.textContent = "end test";
	}

	if (variants[+questions[currentQuestion]].querySelector('input').checked) // object, is in array "questions", was compressed to number with method "valueOf" helping
		rightVariants++;

	if (currentQuestion == questions.length - 1){
		alert('There is ' + rightVariants + ' right variants of ' + questions.length + ' questions'); //when test will end, settings will be like in introdution
		rightVariants = 0;
		this.innerHTML = "&#8594;";
		updatePoll(questions[currentQuestion = 0]);
	} else {
		updatePoll(questions[++currentQuestion]);
	}

}


questions.push(new Question('What is AJAX?', 'AJAX'.split(''), 0));
questions.push(new Question());

updatePoll(questions[++currentQuestion]);
