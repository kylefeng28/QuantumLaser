"use strict";

define(function(require, exports, module) {
	var grid1Config = require("config"); // TODO rename
	var Grid = require("Grid");

	function initialize() {
	}

	window.grid1Config = grid1Config;
	window.Grid = Grid;

	module.exports = {
		initialize,
	};
});
