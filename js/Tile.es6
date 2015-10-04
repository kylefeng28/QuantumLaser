"use strict";

define(function(require, exports, module) {
	class Tile {
		type: TileTypes;
		row: number;
		col: number;
	
		constructor(type: TileTypes, position: [row, col]) {
			this.type = type;
			this.position = position;
		}
	
		initialize(): void {
			this.update();
		}
	
		update(): void {
		}
	
		rotate() {
			var newType = (function() {
				switch (this.type) {
					case TileTypes.Mirror90Right:
						return TileTypes.Mirror90Left;
						break;
					case TileTypes.Mirror90Left:
						return TileTypes.Mirror90Right;
						break;
					default:
						return TileTypes.None;
						break;
				}
			}.bind(this)());
			this.type = newType; // TODO
			this.update();
		}
	
	}

	/*
	 / <=> Mirror90Right
	 \ <=> Mirror90Left
	 */

	var TileTypes =  {
		// enum
		None: 0,
		Mirror90Right: 1,
		Mirror90Left: 2,

		// Methods
		fromChar(char: string): TileTypes {
			switch (char) {
				case '/':  return TileTypes.Mirror90Right; break;
				case '\\': return TileTypes.Mirror90Left;  break;
				default:   return TileTypes.None;          break;
			}
		},
	
		toChar(type: TileTypes): string {
			switch (type) {
				case TileTypes.Mirror90Right: return '/';  break;
				case TileTypes.Mirror90Left:  return '\\'; break;
				default:                      return ' ';  break;
			}
		}


	}
	
	module.exports = { Tile, TileTypes } ;
});
