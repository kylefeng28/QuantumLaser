declare var Raphael, paper;
declare var $;

class Grid {
	static SIZE: number = 100;
	static OFFSET_X: number = 10;
	static OFFSET_Y: number = 10;
	
	config: any;
	nRows: number;
	nCols: number;
	map: string[][];
	squares: Square[][];
	laser: Laser;
	
	// TODO: interface
	constructor(config) {
		this.config = config;
		this.nRows = config.nRows;
		this.nCols = config.nCols;
		this.map = config.map;
		this.laser = new Laser(this);
	}
	
	initialize(): void {
		// Create map if it does not exist
		// TODO: remove
		if (!this.map) {
			this.map = new Array(this.nRows);
			for (var row = 0; row < this.nRows; row++) {
				this.map[row] = new Array(this.nCols);
				for(var col = 0; col < this.nCols; col++) {
					this.map[row][col] = SquareTypes.None;
				}
			}
		}
			
		// Create squares
		// TODO: put in constructor
		this.squares = new Array(this.nRows);
		for (var row = 0; row < this.nRows; row++) {
			this.squares[row] = new Array(this.nCols);
			for(var col = 0; col < this.nCols; col++) {
				var point = [col * Grid.SIZE + Grid.OFFSET_X, row * Grid.SIZE + Grid.OFFSET_Y];
				var type = SquareTypes.None;
		    	type = SquareType.fromChar(this.map[row][col]);
				this.squares[row][col] = new Square(point, type);
			}
		}
		
		// Initialize laser
		this.laser.initialize();
		
		this.update();
	}
	
	update(): void {
		for (var row = 0; row < grid.squares.length; row++) {
			for (var col = 0; col < grid.squares[row].length; col++) {
				grid.squares[row][col].update();
			}
		}
	}
	
	    /**
     * Converts from index notation to algebraic notation as in chess
     * index2algebraic(2, 1) => "b3";
     */
    index2algebraic(row: number, col: number): string {
        var s: string = "";
        s += String.fromCharCode('a'.charCodeAt() + col);
        s += (1 + row);
        return s;
    }

    /**
     * Converts from algebraic notation to index notation
     * algebraic2index("b3") => [2, 1]
     */
    algebraic2index(s: string): number[] {
        var row: number = Number.parseInt(s.substring(1, 2)) - 1;
        var col: number = s.charAt(0) - 'a'.charCodeAt();

        return [row, col];
    }
}


class Square {
	path: any;
	image: any;
	type: SquareTypes;
	
	constructor(point: number[] = [0, 0], type: SquareType = SquareTypes.None) {
		this.type = type;
		this.path = paper.rect(0, 0, Grid.SIZE, Grid.SIZE).transform("T" + point);
		this.image = paper.image("", 0, 0, Grid.SIZE, Grid.SIZE).transform("T" + point);
		this.update();
		
		this.image[0].onmousedown = function () {
			this.onmousedown();
		}.bind(this);
	}
	
	initialize(): void {
		this.update();
	}
	
	update(): void {
		var imagePath = (function() {
			switch (this.type) {
				case SquareTypes.None:
					return "img/Square.png";
					break;
				case SquareTypes.Mirror90Right:
					return "img/Mirror90Right.png";
					break;
				case SquareTypes.Mirror90Left:
					return "img/Mirror90Left.png";
					break;
			}
		}.bind(this)())
		this.image[0].href.baseVal = imagePath;
	}
	
	onmousedown() {
		var newType = (function() {
			switch (this.type) {
				case SquareTypes.Mirror90Right:
					return SquareTypes.Mirror90Left;
					break;
				case SquareTypes.Mirror90Left:
					return SquareTypes.Mirror90Right;
					break;
				default:
					return SquareTypes.None;
					break;
			}
		}.bind(this)());
		this.type = newType; // TODO
		this.update();
	}
	
}

enum SquareTypes {
	None,
	Mirror90Right,
	Mirror90Left,
}

class SquareType {
	static fromChar(char: string): SquareTypes {
		switch (char) {
			case '/': return SquareTypes.Mirror90Right; break;
			case '\\': return SquareTypes.Mirror90Left; break;
			default: return SquareTypes.None; break;
		}
	}
}

class Laser {
	grid: Grid;
	row: number;
	col: number;
	direction: LaserDirections;
	
	circle: any;
	path: any;
	pathArray: any[];
	
	constructor(grid: Grid) {
		this.grid = grid;
		this.circle = paper.circle(0, 0, 0);
		this.circle.glowEffect = this.circle.glow({color:"#1693A5", width: 50});
		this.path = paper.path();
	}
	
	initialize(): void {
		this.row = this.grid.config.laserInitRow;
		this.col = this.grid.config.laserInitCol
		this.direction = this.grid.config.laserInitDirection;
		this.pathArray = [];
        console.log("Starting from %s and going %s\n", this.grid.index2algebraic(this.row, this.col), this.direction);
		this.update();
		this.animate();
	}
	
	update(): void {
		var cx = (this.col + 0.5) * Grid.SIZE + Grid.OFFSET_Y,
		    cy = (this.row + 0.5) * Grid.SIZE + Grid.OFFSET_X,
		    r = Grid.SIZE / 12;
		
		// this.anims.push(Raphael.animation({cx: cx, cy: cy, r: r}, 200, "linear"));
		// this.circle 
		
		if (this.pathArray.length == 0) { this.pathArray.push('M'); }
		else { this.pathArray.push('L'); }
		this.pathArray.push(cx, cy);
	}
	
	animate(): void {
		this.path.toFront();
		this.path.attr({path: this.pathArray.join(' ')});
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
            	this.collide(this.grid.squares[this.row][this.col]);
        }
		this.update();
	}
	
	collide(square: Square): boolean {
		if (square.type != SquareTypes.None) {
			var newDirection: LaserDirections = LaserDirections.None;
            switch (this.direction) {
                case LaserDirections.Up:
                    if (square.type == SquareTypes.Mirror90Right)
                        newDirection = LaserDirections.Right;
                    else if (square.type == SquareTypes.Mirror90Left)
                        newDirection = LaserDirections.Left;
                    break;
                case LaserDirections.Down:
                    if (square.type == SquareTypes.Mirror90Right)
                        newDirection = LaserDirections.Left;
                    else if (square.type == SquareTypes.Mirror90Left)
                        newDirection = LaserDirections.Right;
                    break;
                case LaserDirections.Left:
                    if (square.type == SquareTypes.Mirror90Right)
                        newDirection = LaserDirections.Down;
                    else if (square.type == SquareTypes.Mirror90Left)
                        newDirection = LaserDirections.Up;
                    break;
                case LaserDirections.Right:
                    if (square.type == SquareTypes.Mirror90Right)
                        newDirection = LaserDirections.Up;
                    else if (square.type == SquareTypes.Mirror90Left)
                        newDirection = LaserDirections.Down;
                    break;
            }
            this.direction = newDirection;
            console.log("Collided with square at " + [this.row, this.col]);
            return true;
		} else { return false; }
	}
	
	
	simulate(): string {
		while (this.row >= 0 && this.row < this.grid.nRows &&
		       this.col >= 0 && this.col < this.grid.nCols) {
            console.log("Passed through " + this.grid.index2algebraic(this.row, this.col));
            this.step();
        }
        var result: string = grid.index2algebraic(this.row, this.col);
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

