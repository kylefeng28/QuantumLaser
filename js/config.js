"use strict";

define(function(require, exports, module) {
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

	module.exports = grid1Config;
});
