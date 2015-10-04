"use strict";

define(function(require, exports, module) {
	var { Tile, TileTypes } = require("tile");
	var { Laser, LaserDirections } = require("laser");

	class Grid {
		config: any;
		nRows: number;
		nCols: number;
		map: Array<Array<string>>;
		tiles: Array<Tile>;
		laser: Laser;
	
		constructor(config) {
			this.config = config;
			this.nRows = config.nRows;
			this.nCols = config.nCols;
			this.map = config.map;
		}
	
		static tilesFromConfig(config) {
			var tiles = [];
			for (var row = 0; row < config.nRows; row++) {
				tiles[row] = [];
				for(var col = 0; col < config.nCols; col++) {
					var type = TileTypes.fromChar(config.map[row][col]);
					tiles[row][col] = new Tile(type, row, col);
				}
			}
			return tiles;
		}
	
		initialize() {
			this.tiles = Grid.tilesFromConfig(this.config);
			this.laser = new Laser(this);
	
			this.laser.initialize();
	
			this.update();
		}
	
		update() {
			for (var row = 0; row < this.tiles.length; row++) {
				for (var col = 0; col < this.tiles[row].length; col++) {
					this.tiles[row][col].update();
				}
			}
		}

		toString() {
			var str = '';
			for (var row = 0; row < this.tiles.length; row++) {
				for (var col = 0; col < this.tiles[row].length; col++) {
					str += TileTypes.toChar(this.tiles[row][col].type);
				}
				str += '\n';
			}
			return str;
		}
	
	}
	
	module.exports = Grid;
});
