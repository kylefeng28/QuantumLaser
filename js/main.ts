disableScroll();
initialize();

function initialize() {
	// Get a reference to the canvas object
	var canvas = document.getElementById("canvas");
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

	paper.view.onFrame = onFrame;
	
	var grid = new Grid();
	grid.draw();
	window.grid = grid;

}

function disableScroll() {
	document.body.addEventListener("touchstart", function(e) { e.perventDefault(); });
	document.body.addEventListener("touchmove", function(e) { e.perventDefault(); });
}

function onFrame() {
}