var Grid = (function () {
    function Grid(rows, cols) {
        this.rows = rows || 3;
        this.cols = cols || 3;
    }
    Grid.prototype.draw = function () {
        var self = this;
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                var point = [row * Grid.SIZE + Grid.OFFSET_X, col * Grid.SIZE + Grid.OFFSET_Y];
                self.squares[row, col] = new Square(point);
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
    function Square(point, direction) {
        if (typeof point === "undefined") { point = "0, 0"; }
        if (typeof direction === "undefined") { direction = 0 /* None */; }
        this.direction = direction;
        this.path = paper.rect(0, 0, Grid.SIZE, Grid.SIZE).transform("T" + point);
    }
    return Square;
})();

var SquareDirection;
(function (SquareDirection) {
    SquareDirection[SquareDirection["None"] = 0] = "None";
    SquareDirection[SquareDirection["Mirror90Right"] = 1] = "Mirror90Right";
    SquareDirection[SquareDirection["Mirror90Left"] = 2] = "Mirror90Left";
})(SquareDirection || (SquareDirection = {}));

var Laser = (function () {
    function Laser(grid) {
        this.grid = grid;
        this.path = paper.circle(0, 0, 0);
        this.path.glowEffect = this.path.glow({ color: "#1693A5", width: 50 });
    }
    Laser.prototype.initialize = function (row, col, direction) {
        this.row = row;
        this.col = col;
        this.direction = direction;
        console.log("Starting from %s and going %s\n", grid.index2algebraic(row, col), direction);
        this.update();
    };

    Laser.prototype.update = function () {
        var cy = (this.row + 0.5) * Grid.SIZE + Grid.OFFSET_X, cx = (this.col + 0.5) * Grid.SIZE + Grid.OFFSET_Y, r = Grid.SIZE / 12;

        this.path.animate({ transform: "T" + [cx, cy] }, 200, "linear");
        this.path.attr({ r: r });
    };

    Laser.prototype.step = function () {
        var translation = (function (direction) {
            switch (direction) {
                case 0 /* Right */:
                    return [0, 1];
                    break;
                case 90 /* Up */:
                    return [1, 0];
                    break;
                case 180 /* Left */:
                    return [0, -1];
                    break;
                case 270 /* Down */:
                    return [-1, 0];
                    break;
            }
        }(this.direction));
        this.row += translation[0];
        this.col += translation[1];
        this.update();
    };
    return Laser;
})();

var LaserDirection;
(function (LaserDirection) {
    LaserDirection[LaserDirection["Right"] = 0] = "Right";
    LaserDirection[LaserDirection["Up"] = 90] = "Up";
    LaserDirection[LaserDirection["Left"] = 180] = "Left";
    LaserDirection[LaserDirection["Down"] = 270] = "Down";
})(LaserDirection || (LaserDirection = {}));
