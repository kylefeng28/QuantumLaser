"use strict";

define(function(require, exports, module) {
	class Grid {
		/*
		config: any;
		nRows: number;
		nCols: number;
		map: string[][];
		tiles: Tile[][];
		laser: Laser;
		*/
	
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
					var type = TileTypes.None;
					type = TileType.fromChar(config.map[row][col]);
					tiles[row][col] = new Tile(type, [row, col]);
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
	
	}
	
	module.exports = Grid;
}
