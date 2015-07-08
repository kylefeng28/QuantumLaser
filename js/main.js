// $("window").load(
window.onload = function () {
    mobileAppMods();
    initialize();
};

// );
function initialize() {
    var container = $("#canvas_container")[0];
    paper = new Raphael(container);

    var grid = new Grid();
    window.grid = grid;
    grid.draw();

    var laser = new Laser();
    window.laser = laser;
    laser.initialize(0, -1, LaserDirection.Right);

    $("#button1").click(function () {
        laser.step();
    });
}

function mobileAppMods() {
    $("body").on("touchstart", function (e) {
        e.preventDefault();
    });
    $("body").on("touchmove", function (e) {
        e.preventDefault();
    });
    window.scrollTo(0, 1);
}
