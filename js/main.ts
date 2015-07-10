// $("window").load(
window.onload = 
function() {
	mobileAppMods();
	initialize();
};
// );

function initialize() {
	var container = $("#paper")[0];
	paper = new Raphael(container);
	
		
	var grid1Config = {
		nRows: 3,
		nCols: 3,
		map: [ [" ", "\\", " "],
		       [" ", " " , " "],
		       [" ", "\\", " "] ],
		laserInitPoint: [0, 0],
	}
		
	var grid = new Grid(grid1Config);
	window.grid = grid;
	
	grid.initialize();
	grid.update();
	
	var laser = new Laser(grid);
	window.laser = laser;
	laser.initialize(0, 0, LaserDirections.Right);
	
	$("#button1").click(function() {
		laser.simulate();
		laser.animate();
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

