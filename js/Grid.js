var Grid = (function () {
    // TODO: interface
    function Grid(config) {
        this.config = config;
        this.nRows = config.nRows;
        this.nCols = config.nCols;
        this.map = config.map;
        this.laser = new Laser(this);
    }
    Grid.prototype.initialize = function () {
        // Create map if it does not exist
        // TODO: remove
        if (!this.map) {
            this.map = new Array(this.nRows);
            for (var row = 0; row < this.nRows; row++) {
                this.map[row] = new Array(this.nCols);
                for (var col = 0; col < this.nCols; col++) {
                    this.map[row][col] = 0 /* None */;
                }
            }
        }

        // Create squares
        // TODO: put in constructor
        this.squares = new Array(this.nRows);
        for (var row = 0; row < this.nRows; row++) {
            this.squares[row] = new Array(this.nCols);
            for (var col = 0; col < this.nCols; col++) {
                var point = [col * Grid.SIZE + Grid.OFFSET_X, row * Grid.SIZE + Grid.OFFSET_Y];
                var type = 0 /* None */;
                type = SquareType.fromChar(this.map[row][col]);
                this.squares[row][col] = new Square(point, type);
            }
        }

        // Initialize laser
        this.laser.initialize();

        this.update();
    };

    Grid.prototype.update = function () {
        for (var row = 0; row < grid.squares.length; row++) {
            for (var col = 0; col < grid.squares[row].length; col++) {
                grid.squares[row][col].update();
            }
        }
    };

    /**
    * Converts from index notation to algebraic notation as in chess
    * index2algebraic(2, 1) => "b3";
    */
    Grid.prototype.index2algebraic = function (row, col) {
        var s = "";
        s += String.fromCharCode('a'.charCodeAt() + col);
        s += (1 + row);
        return s;
    };

    /**
    * Converts from algebraic notation to index notation
    * algebraic2index("b3") => [2, 1]
    */
    Grid.prototype.algebraic2index = function (s) {
        var row = Number.parseInt(s.substring(1, 2)) - 1;
        var col = s.charAt(0) - 'a'.charCodeAt();

        return [row, col];
    };
    Grid.SIZE = 100;
    Grid.OFFSET_X = 10;
    Grid.OFFSET_Y = 10;
    return Grid;
})();

var Square = (function () {
    function Square(point, type) {
        if (typeof point === "undefined") { point = [0, 0]; }
        if (typeof type === "undefined") { type = 0 /* None */; }
        this.type = type;
        this.path = paper.rect(0, 0, Grid.SIZE, Grid.SIZE).transform("T" + point);
        this.image = paper.image("", 0, 0, Grid.SIZE, Grid.SIZE).transform("T" + point);
        this.update();

        this.image[0].onmousedown = function () {
            this.onmousedown();
        }.bind(this);
    }
    Square.prototype.initialize = function () {
        this.update();
    };

    Square.prototype.update = function () {
        var imagePath = (function () {
            switch (this.type) {
                case 0 /* None */:
                    return "img/Square.png";
                    break;
                case 1 /* Mirror90Right */:
                    return "img/Mirror90Right.png";
                    break;
                case 2 /* Mirror90Left */:
                    return "img/Mirror90Left.png";
                    break;
            }
        }.bind(this)());
        this.image[0].href.baseVal = imagePath;
    };

    Square.prototype.onmousedown = function () {
        var newType = (function () {
            switch (this.type) {
                case 1 /* Mirror90Right */:
                    return 2 /* Mirror90Left */;
                    break;
                case 2 /* Mirror90Left */:
                    return 1 /* Mirror90Right */;
                    break;
                default:
                    return 0 /* None */;
                    break;
            }
        });
        this.type = newType; // TODO
        this.update();
    };
    return Square;
})();

var SquareTypes;
(function (SquareTypes) {
    SquareTypes[SquareTypes["None"] = 0] = "None";
    SquareTypes[SquareTypes["Mirror90Right"] = 1] = "Mirror90Right";
    SquareTypes[SquareTypes["Mirror90Left"] = 2] = "Mirror90Left";
})(SquareTypes || (SquareTypes = {}));

var SquareType = (function () {
    function SquareType() {
    }
    SquareType.fromChar = function (char) {
        switch (char) {
            case '/':
                return 1 /* Mirror90Right */;
                break;
            case '\\':
                return 2 /* Mirror90Left */;
                break;
            default:
                return 0 /* None */;
                break;
        }
    };
    return SquareType;
})();

var Laser = (function () {
    function Laser(grid) {
        this.grid = grid;
        this.circle = paper.circle(0, 0, 0);
        this.circle.glowEffect = this.circle.glow({ color: "#1693A5", width: 50 });
        this.path = paper.path();
    }
    Laser.prototype.initialize = function () {
        this.row = this.grid.config.laserInitRow;
        this.col = this.grid.config.laserInitCol;
        this.direction = this.grid.config.laserInitDirection;
        this.pathArray = [];
        console.log("Starting from %s and going %s\n", grid.index2algebraic(row, col), direction);
        this.update();
        this.animate();
    };

    Laser.prototype.update = function () {
        var cx = (this.col + 0.5) * Grid.SIZE + Grid.OFFSET_Y, cy = (this.row + 0.5) * Grid.SIZE + Grid.OFFSET_X, r = Grid.SIZE / 12;

        // this.anims.push(Raphael.animation({cx: cx, cy: cy, r: r}, 200, "linear"));
        // this.circle
        if (this.pathArray.length == 0) {
            this.pathArray.push('M');
        } else {
            this.pathArray.push('L');
        }
        this.pathArray.push(cx, cy);
    };

    Laser.prototype.animate = function () {
        this.path.toFront();
        this.path.attr({ path: this.pathArray.join(' ') });
    };

    Laser.prototype.step = function () {
        var translation = (function () {
            switch (this.direction) {
                case 0 /* None */:
                    return [0, 0];
                    break;
                case 1 /* Up */:
                    return [-1, 0];
                    break;
                case 2 /* Down */:
                    return [1, 0];
                    break;
                case 3 /* Left */:
                    return [0, -1];
                    break;
                case 4 /* Right */:
                    return [0, 1];
                    break;
            }
        }.bind(this)());
        this.row += translation[0];
        this.col += translation[1];

        if (this.row >= 0 && this.row < this.grid.nRows && this.col >= 0 && this.col < this.grid.nCols) {
            this.collide(this.grid.squares[this.row][this.col]);
        }
        this.update();
    };

    Laser.prototype.collide = function (square) {
        if (square.type != 0 /* None */) {
            var newDirection = 0 /* None */;
            switch (this.direction) {
                case 1 /* Up */:
                    if (square.type == 1 /* Mirror90Right */)
                        newDirection = 4 /* Right */;
                    else if (square.type == 2 /* Mirror90Left */)
                        newDirection = 3 /* Left */;
                    break;
                case 2 /* Down */:
                    if (square.type == 1 /* Mirror90Right */)
                        newDirection = 3 /* Left */;
                    else if (square.type == 2 /* Mirror90Left */)
                        newDirection = 4 /* Right */;
                    break;
                case 3 /* Left */:
                    if (square.type == 1 /* Mirror90Right */)
                        newDirection = 2 /* Down */;
                    else if (square.type == 2 /* Mirror90Left */)
                        newDirection = 1 /* Up */;
                    break;
                case 4 /* Right */:
                    if (square.type == 1 /* Mirror90Right */)
                        newDirection = 1 /* Up */;
                    else if (square.type == 2 /* Mirror90Left */)
                        newDirection = 2 /* Down */;
                    break;
            }
            this.direction = newDirection;
            console.log("Collided with square at " + [this.row, this.col]);
            return true;
        } else {
            return false;
        }
    };

    Laser.prototype.simulate = function () {
        while (this.row >= 0 && this.row < this.grid.nRows && this.col >= 0 && this.col < this.grid.nCols) {
            console.log("Passed through " + this.grid.index2algebraic(this.row, this.col));
            this.step();
        }
        var result = grid.index2algebraic(this.row, this.col);
        console.log("Exited from " + result);
        return result;
    };
    return Laser;
})();

var LaserDirections;
(function (LaserDirections) {
    LaserDirections[LaserDirections["None"] = 0] = "None";
    LaserDirections[LaserDirections["Up"] = 1] = "Up";
    LaserDirections[LaserDirections["Down"] = 2] = "Down";
    LaserDirections[LaserDirections["Left"] = 3] = "Left";
    LaserDirections[LaserDirections["Right"] = 4] = "Right";
})(LaserDirections || (LaserDirections = {}));
