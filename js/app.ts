"use strict";

define(function(require, exports, module) {
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
			laserInitRow: 0,
			laserInitCol: 0,
			laserInitDirection: LaserDirections.Right,
		}
	
		var grid = new Grid(grid1Config);
		window.grid = grid;
	
		grid.initialize();
	
		$("#button1").click(function() {
			grid.laser.simulate();
			grid.laser.animate();
		});
	
		$("#buttonReset").click(function() {
			grid.laser.initialize(0, 0, LaserDirections.Right);
		});
	
	}
	
	function mobileAppMods() {
		$("body").on("touchstart", function(e) { e.preventDefault(); });
		$("body").on("touchmove", function(e) { e.preventDefault(); });
		window.scrollTo(0, 1);
	}
	
		module.exports = {
			initialize
		}
});
