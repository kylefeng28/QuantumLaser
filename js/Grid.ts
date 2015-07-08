class Grid {
	static SIZE: number = 100;
	static OFFSET_X: number = 10;
	static OFFSET_Y: number = 10;
	
	rows: number;
	cols: number;
	squares: Square[];
	
	constructor(rows, cols) {
		this.rows = rows || 3;
		this.cols = cols || 3;
	}
	
	draw(): void {
		for(var row = 0; row < this.rows; row++) {
			for(var col = 0; col < this.cols; col++) {
				var point = [row * Grid.SIZE + Grid.OFFSET_X, col * Grid.SIZE + Grid.OFFSET_Y];
				/*this.squares[row, col] =*/ new Square(point);
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
	
	constructor(point: string) {
		point = point || "0, 0";
		this.path = paper.rect(0, 0, Grid.SIZE, Grid.SIZE).transform("T" + point);
	}
}

class Laser {
	grid: Grid;
	path: any;
	row: number;
	col: number;
	direction: LaserDirection;
	
	constructor(grid: Grid) {
		this.grid = grid;
		this.path = paper.circle(0, 0, 0);
		this.path.glowEffect = this.path.glow({color:"#1693A5", width: 50});
	}
	
	initialize(row: number, col: number, direction: LaserDirection): void {
		this.row = row;
		this.col = col;
		this.direction = direction;
        console.log("Starting from %s and going %s\n", grid.index2algebraic(row, col), direction);
		this.update();
	}
	
	update(): void {
		var cy = (this.row + 0.5) * Grid.SIZE + Grid.OFFSET_X,
		    cx = (this.col + 0.5) * Grid.SIZE + Grid.OFFSET_Y,
		    r = Grid.SIZE / 12;
		
		this.path.animate({transform: "T" + [cx, cy]}, 200, "linear");
		this.path.attr({r: r});
	}
	
	step(): void {
		var translation = (function(direction) {
			switch (direction) {
				case LaserDirection.Right:
					return [0, 1];
					break;
				case LaserDirection.Up:
					return [1, 0];
					break;
				case LaserDirection.Left:
					return [0, -1];
					break;
				case LaserDirection.Down:
					return [-1, 0];
					break;
			}
		}(this.direction));
		this.row += translation[0];
		this.col += translation[1];
		this.update();
	}
	
}

enum LaserDirection {
	Right = 0,
	Up = 90,
	Left = 180,
	Down = 270
}