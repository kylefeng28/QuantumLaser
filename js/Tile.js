"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(function (require, exports, module) {
	var Tile = (function () {
		function Tile(type, position) {
			_classCallCheck(this, Tile);

			this.type = type;
			this.position = position;
		}

		/*
   / <=> Mirror90Right
   \ <=> Mirror90Left
   */

		_createClass(Tile, [{
			key: 'initialize',
			value: function initialize() {
				this.update();
			}
		}, {
			key: 'update',
			value: function update() {}
		}, {
			key: 'rotate',
			value: function rotate() {
				var newType = (function () {
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
				}).bind(this)();
				this.type = newType; // TODO
				this.update();
			}
		}]);

		return Tile;
	})();

	var TileTypes = {
		// enum
		None: 0,
		Mirror90Right: 1,
		Mirror90Left: 2,

		// Methods
		fromChar: function fromChar(char) {
			switch (char) {
				case '/':
					return TileTypes.Mirror90Right;break;
				case '\\':
					return TileTypes.Mirror90Left;break;
				default:
					return TileTypes.None;break;
			}
		},

		toChar: function toChar(type) {
			switch (type) {
				case TileTypes.Mirror90Right:
					return '/';break;
				case TileTypes.Mirror90Left:
					return '\\';break;
				default:
					return ' ';break;
			}
		}

	};

	module.exports = { Tile: Tile, TileTypes: TileTypes };
});