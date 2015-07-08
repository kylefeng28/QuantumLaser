var Grid = (function () {
    function Grid(rows, cols) {
        this.rows = rows || 3;
        this.cols = cols || 3;
    }
    Grid.prototype.draw = function () {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                var point = (row * Grid.SIZE) + ", " + (col * Grid.SIZE);
                /*this.squares[row, col] =*/ new Square(point);
            }
        }
    };
    Grid.SIZE = 100;
    return Grid;
})();

var Square = (function () {
    function Square(point) {
        point = point || "0, 0";
        this.path = paper.rect(0, 0, 100, 100).transform("t" + point);
    }
    return Square;
})();

var Laser = (function () {
    function Laser() {
        this.self = this;
        self.path = paper.circle(0, 0, 0);
        self.path.glowEffect = this.path.glow({ color: "#1693A5", width: 50 });
    }
    Laser.prototype.initialize = function (row, col, direction) {
        self.row = row;
        self.col = col;
        self.direction = direction;
        this.update();
    };

    Laser.prototype.update = function () {
        this.path.attr({
            cy: (self.row + 1) * Grid.SIZE / 2,
            cx: (self.col + 1) * Grid.SIZE / 2,
            r: Grid.SIZE / 6
        });
    };

    Laser.prototype.step = function () {
        var translation = (function () {
            console.log(self.direction);
            switch (self.direction) {
                case 0 /* Right */:
                    return "1, 0";
                    break;
                case 90 /* Up */:
                    return "0, 1";
                    break;
                case 180 /* Left */:
                    return "-1, 0";
                    break;
                case 270 /* Down */:
                    return "0, -1";
                    break;
            }
        }());
        self.path.transform("t" + translation);
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
