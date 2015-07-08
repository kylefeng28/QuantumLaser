window.onload = function () {
    disableScroll();
    initialize();
};

function initialize() {
    var container = $("#canvas_container")[0];
    paper = new Raphael(container);

    var grid = new Grid();
    window.grid = grid;
    grid.draw();

    var laser = new Laser();
    window.laser = laser;
    laser.initialize(0, 0, 0 /* Right */);

    $("#button1").click(function () {
        console.log("You pressed it!");
        laser.step();
    });
}

function disableScroll() {
    document.body.addEventListener("touchstart", function (e) {
        e.preventDefault();
    });
    document.body.addEventListener("touchmove", function (e) {
        e.preventDefault();
    });
}
