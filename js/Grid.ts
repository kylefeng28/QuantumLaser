class Grid {
	static SIZE = 100;
	
	draw() {
		for(var row = 0; row < 3; row++) {
			for(var col = 0; col < 3; col++) {
				var point = new paper.Point(row * Grid.SIZE, col * Grid.SIZE);
				new Square(point);
			}
		}
	}
}


class Square {
	constructor(point) {
		var path;
		point = point || new paper.Point(0, 0);
		path = new paper.Path.Rectangle(point, 100);
		path.strokeColor = "black";
	}
}

class Laser {
	
}