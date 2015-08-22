"use strict";

define(function(require, exports, module) {
	class Laser {
		grid: Grid;
		row: number;
		col: number;
		direction: LaserDirections;
	
		constructor(grid: Grid) {
			this.grid = grid;
		}
	
		initialize(): void {
			this.row = this.grid.config.laserInitRow;
			this.col = this.grid.config.laserInitCol
			this.direction = this.grid.config.laserInitDirection;
			console.log("Starting from %s and going %s\n", [this.row, this.col], this.direction);
			this.update();
			this.animate();
		}
	
		update(): void {
		}
	
		step(): void {
			var translation = (function() {
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
			}.bind(this)());
			this.row += translation[0];
			this.col += translation[1];
	
			if (this.row >= 0 && this.row < this.grid.nRows &&
				this.col >= 0 && this.col < this.grid.nCols) {
					this.collide(this.grid.tiles[this.row][this.col]);
			}
			this.update();
		}
	
		collide(tile: Tile): boolean {
			if (tile.type != TileTypes.None) {
				var newDirection: LaserDirections = LaserDirections.None;
				switch (this.direction) {
					case LaserDirections.Up:
						if (tile.type == TileTypes.Mirror90Right)
							newDirection = LaserDirections.Right;
						else if (tile.type == TileTypes.Mirror90Left)
							newDirection = LaserDirections.Left;
						break;
					case LaserDirections.Down:
						if (tile.type == TileTypes.Mirror90Right)
							newDirection = LaserDirections.Left;
						else if (tile.type == TileTypes.Mirror90Left)
							newDirection = LaserDirections.Right;
						break;
					case LaserDirections.Left:
						if (tile.type == TileTypes.Mirror90Right)
							newDirection = LaserDirections.Down;
						else if (tile.type == TileTypes.Mirror90Left)
							newDirection = LaserDirections.Up;
						break;
					case LaserDirections.Right:
						if (tile.type == TileTypes.Mirror90Right)
							newDirection = LaserDirections.Up;
						else if (tile.type == TileTypes.Mirror90Left)
							newDirection = LaserDirections.Down;
						break;
				}
				this.direction = newDirection;
				console.log("Collided with tile at " + [this.row, this.col]);
				return true;
			} else { return false; }
		}
	
	
		simulate(): string {
			while (this.row >= 0 && this.row < this.grid.nRows &&
				   this.col >= 0 && this.col < this.grid.nCols) {
				console.log("Passed through " + [this.row, this.col]);
				this.step();
			}
			var result = "" + [this.row, this.col];
			console.log("Exited from " + result);
			return result;
		}
	
	}
	
	enum LaserDirections {
		None,
		Up,
		Down,
		Left,
		Right,
	}

	module.exports = Laser;
}
