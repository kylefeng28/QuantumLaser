"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function (require, exports, module) {
	var Grid = require("grid");

	var Laser = (function () {
		function Laser(grid) {
			_classCallCheck(this, Laser);

			this.grid = grid;
		}

		_createClass(Laser, [{
			key: "initialize",
			value: function initialize() {
				this.row = this.grid.config.laserInitRow;
				this.col = this.grid.config.laserInitCol;
				this.direction = this.grid.config.laserInitDirection;
				console.log("Starting from %s and going %s\n", [this.row, this.col], this.direction);
				this.update();
			}
		}, {
			key: "update",
			value: function update() {}
		}, {
			key: "step",
			value: function step() {
				var translation = (function () {
					switch (this.direction) {
						case LaserDirections.None:
							return [0, 0];
							break;
						case LaserDirections.Up:
							return [-1, 0];
							break;
						case LaserDirections.Down:
							return [1, 0];
							break;
						case LaserDirections.Left:
							return [0, -1];
							break;
						case LaserDirections.Right:
							return [0, 1];
							break;
					}
				}).bind(this)();
				this.row += translation[0];
				this.col += translation[1];

				if (this.row >= 0 && this.row < this.grid.nRows && this.col >= 0 && this.col < this.grid.nCols) {
					this.collide(this.grid.tiles[this.row][this.col]);
				}
				this.update();
			}
		}, {
			key: "collide",
			value: function collide(tile) {
				if (tile.type != TileTypes.None) {
					var newDirection = LaserDirections.None;
					switch (this.direction) {
						case LaserDirections.Up:
							if (tile.type == TileTypes.Mirror90Right) newDirection = LaserDirections.Right;else if (tile.type == TileTypes.Mirror90Left) newDirection = LaserDirections.Left;
							break;
						case LaserDirections.Down:
							if (tile.type == TileTypes.Mirror90Right) newDirection = LaserDirections.Left;else if (tile.type == TileTypes.Mirror90Left) newDirection = LaserDirections.Right;
							break;
						case LaserDirections.Left:
							if (tile.type == TileTypes.Mirror90Right) newDirection = LaserDirections.Down;else if (tile.type == TileTypes.Mirror90Left) newDirection = LaserDirections.Up;
							break;
						case LaserDirections.Right:
							if (tile.type == TileTypes.Mirror90Right) newDirection = LaserDirections.Up;else if (tile.type == TileTypes.Mirror90Left) newDirection = LaserDirections.Down;
							break;
					}
					this.direction = newDirection;
					console.log("Collided with tile at " + [this.row, this.col]);
					return true;
				} else {
					return false;
				}
			}
		}, {
			key: "simulate",
			value: function simulate() {
				while (this.row >= 0 && this.row < this.grid.nRows && this.col >= 0 && this.col < this.grid.nCols) {
					console.log("Passed through " + [this.row, this.col]);
					this.step();
				}
				var result = "" + [this.row, this.col];
				console.log("Exited from " + result);
				return result;
			}
		}]);

		return Laser;
	})();

	var LaserDirections = {
		// enum
		None: 0,
		Up: 1,
		Down: 2,
		Left: 3,
		Right: 4
	};

	module.exports = { Laser: Laser, LaserDirections: LaserDirections };
});