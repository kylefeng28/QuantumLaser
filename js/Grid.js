"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function (require, exports, module) {
	var _require = require("tile");

	var Tile = _require.Tile;
	var TileTypes = _require.TileTypes;

	var _require2 = require("laser");

	var Laser = _require2.Laser;
	var LaserDirections = _require2.LaserDirections;

	var Grid = (function () {
		function Grid(config) {
			_classCallCheck(this, Grid);

			this.config = config;
			this.nRows = config.nRows;
			this.nCols = config.nCols;
			this.map = config.map;
		}

		_createClass(Grid, [{
			key: "initialize",
			value: function initialize() {
				this.tiles = Grid.tilesFromConfig(this.config);
				this.laser = new Laser(this);

				this.laser.initialize();

				this.update();
			}
		}, {
			key: "update",
			value: function update() {
				for (var row = 0; row < this.tiles.length; row++) {
					for (var col = 0; col < this.tiles[row].length; col++) {
						this.tiles[row][col].update();
					}
				}
			}
		}, {
			key: "toString",
			value: function toString() {
				var str = '';
				for (var row = 0; row < this.tiles.length; row++) {
					for (var col = 0; col < this.tiles[row].length; col++) {
						str += TileTypes.toChar(this.tiles[row][col].type);
					}
					str += '\n';
				}
				return str;
			}
		}], [{
			key: "tilesFromConfig",
			value: function tilesFromConfig(config) {
				var tiles = [];
				for (var row = 0; row < config.nRows; row++) {
					tiles[row] = [];
					for (var col = 0; col < config.nCols; col++) {
						var type = TileTypes.fromChar(config.map[row][col]);
						tiles[row][col] = new Tile(type, row, col);
					}
				}
				return tiles;
			}
		}]);

		return Grid;
	})();

	module.exports = Grid;
});