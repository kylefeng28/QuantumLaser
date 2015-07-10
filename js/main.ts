// $("window").load(
window.onload = 
function() {
	// mobileAppMods();
	initialize();
};
// );

function initialize() {
	var container = $("#canvas_container")[0];
	paper = new Raphael(container);
	
	var map = [
			[" ", "/", " "],
		 	[" ", " ", " "],
		 	[" ", "/", " "]
		];
		
	var grid = new Grid(3, 3, map);
	window.grid = grid;
	
	grid.initialize();
	grid.update();
	
	var laser = new Laser(grid);
	window.laser = laser;
	laser.initialize(0, 0, LaserDirections.Right);
	
	$("#button1").click(function() {
		laser.simulate();
	});
	
	$("#buttonReset").click(function() {
		laser.initialize(0, 0, LaserDirections.Right);
	});

}

function mobileAppMods() {
	$("body").on("touchstart", function(e) { e.preventDefault(); });
	$("body").on("touchmove", function(e) { e.preventDefault(); });
	window.scrollTo(0, 1);
}

