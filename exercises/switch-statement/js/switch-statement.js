// var food = 'tacos';
// var food = prompt("What's your favorite food?");
var food;

switch (food) {
	case 'pizza':
		console.log('Pizza is the best');
		break;
	case 'tacos':
		console.log('Tacos are the best');
		break;
	case 'sushi':
		console.log('Sushi is the best');
		break;
};

// var grade = 'C';
var grade = prompt("What's your grade?");

if (grade === 'A') {
	console.log('Awesome job!');
} else if (grade === 'B') {
	console.log('Good job!');
} else if (grade === 'C') {
	console.log('You did ok.');
} else if (grade === 'D') {
	console.log('Try more.');
} else if (grade === 'F') {
	console.log('Jeez.');
} else {
	console.log('Unexpected error.');
};

switch (grade) {
	case 'A':
		console.log('Awesome job!');
		break;
	case 'B':
		console.log('Good job!');
		break;
	case 'C':
		console.log('You did ok.');
		break;
	case 'D':
		console.log('Try more.');
		break;
	case 'F':
		console.log('Jeez.');
		break;
	default:
		console.log('Unexpected error.')
};

switch (grade) {
	case 'A':
	case 'B':
	case 'C':
		console.log('You passed!');
		break;
	case 'D':
	case 'F':
		console.log('Sorry, you failed.')
		break;
	default:
		console.log('Unexpected error');
};