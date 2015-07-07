initialize();
grid();

var SIZE = 100;

function initialize() {
	// Get a reference to the canvas object
	var canvas = document.getElementById('canvas');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

}


function square(point) {
	var path;
	point = point || new paper.Point(0, 0);
	path = new paper.Path.Rectangle(point, 100);
	path.strokeColor = 'black';
}

function grid() {
	for(var row = 0; row < 3; row++) {
		for(var col = 0; col < 3; col++) {
			var point = new paper.Point(row * 100, col * 100);
			square(point);
		}
	}
}

// Draw the view now:
paper.view.draw();

/*
// Get a reference to the canvas object
var canvas = document.getElementById('canvas');
// Create an empty project and a view for the canvas:
paper.setup(canvas);
// Create a Paper.js Path to draw a line into it:
var path = new paper.Path();
// Give the stroke a color
path.strokeColor = 'black';
var start = new paper.Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note that the plus operator on Point objects does not work
// in JavaScript. Instead, we need to call the add() function:
path.lineTo(start.add([ 200, -50 ]));
// Draw the view now:
paper.view.draw();
*/
