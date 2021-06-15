//Grid Implementation

var row = 21;
var col = 45;

var grid = new Array(col);
var h, w;

class Cell {

    //Defining property of each Cell
    constructor(i, j) {
        this.i = i;
        this.j = j;

        this.f = Infinity;
        this.h = Infinity;
        this.g = Infinity;

        this.wall = false;
        this.visited = false;
        this.end = false;
        this.neighbours = [];
        this.camefrom = null;

    }

    //For displaying 
    showyou(col) {
        fill(col);

        if (this.wall)
            fill(100, 100, 100);
        if (this.end)
            fill(255, 0, 0);

        strokeWeight(0.1);
        stroke(100, 100, 100);
        rect(this.i * w, this.j * h, w, h, 5);
    }

    //Adding neighbours of current Cell
    addneighbours(grid) {
        var i = this.i;
        var j = this.j;

        if (i < col - 1 && grid[i + 1][j].wall == false) {
            this.neighbours.push(grid[i + 1][j]);
        }
        if (i > 0 && grid[i - 1][j].wall == false) {
            this.neighbours.push(grid[i - 1][j]);
        }
        if (j < row - 1 && grid[i][j + 1].wall == false) {
            this.neighbours.push(grid[i][j + 1]);
        }
        if (j > 0 && grid[i][j - 1].wall == false) {
            this.neighbours.push(grid[i][j - 1]);
        }

        //If diagonals in path is allowed,add them as neighbours also
        var diag = $("#diagonal-panel option:selected")
        if (diag.text() == "Allowed") {

            if (i < col - 1 && j < row - 1 && grid[i + 1][j + 1].wall == false && !(grid[i + 1][j].wall == true && grid[i][j + 1].wall == true)) {
                this.neighbours.push(grid[i + 1][j + 1]);

            }
            if (i > 0 && j > 0 && grid[i - 1][j - 1].wall == false && !(grid[i - 1][j].wall == true && grid[i][j - 1].wall == true)) {
                this.neighbours.push(grid[i - 1][j - 1]);

            }
            if (i > 0 && j < row - 1 && grid[i - 1][j + 1].wall == false && !(grid[i - 1][j].wall == true && grid[i][j + 1].wall == true)) {
                this.neighbours.push(grid[i - 1][j + 1]);

            }
            if (j > 0 && i < col - 1 && grid[i + 1][j - 1].wall == false && !(grid[i + 1][j].wall == true && grid[i][j - 1].wall == true)) {
                this.neighbours.push(grid[i + 1][j - 1]);
            }
        }
    }
}

//This is the root of this complete Project!!.
function setup() {

    //Grid Canvas
    createCanvas(1250, 585);

    var canvas = document.getElementById("defaultCanvas0");

    var ctx = canvas.getContext('2d');
    ctx.shadowColor = "grey";

    h = height / row;
    w = width / col;

    for (var i = 0; i < col; i++) grid[i] = new Array(row);

    //Assigning default property to each cell
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {

            grid[i][j] = new Cell(i, j);
            grid[i][j].showyou(color(255));
        }
    }

    //Default start and End
    strt = grid[18][10];
    end = grid[25][10];

    strt.wall = false;
    end.wall = false;

    strt.showyou(color(0, 255, 0));
    end.showyou(color(255, 0, 0));
}

//This function repeats again and again.Provided by p5.js ,Javascript Library for creative coding!! 
async function draw() {

    //If Single Destination is Selected Keep the dropdown disable
    var xd = document.getElementsByName("algo");

    if (xd[0].checked) {
        document.getElementById("algorithm-panel").disabled = false;
        //document.getElementById("Range").style.display = "block";
        //If transferring from Multiple destinations to Single Destination Option,Clear the Grid
        if (only) {

            for (var i = 0; i < col; i++) {
                for (var j = 0; j < row; j++) {
                    grid[i][j].end = false;
                    grid[i][j].showyou(color(255));

                }
            }

            strt.showyou(color(0, 255, 0));
            end.showyou(color(255, 0, 0));
            only = false;
        }
    } else {
        only = true;
        //document.getElementById("Range").style.display = "none";
        document.getElementById("algorithm-panel").disabled = true;
    }

    var algo = document.getElementsByName("algo");

    if (algo[1].checked && remin) {
        remin = false;
        remind();

    }
}
//Notification to user in the form of pop-up

//Path Found
function success(c) {
    swal({
        title: "Congratulations!!",
        text: "Found Path with length " + c,
        icon: "success",
        button: "OK",
    });
}

//No path found
function fail() {
    swal({
        title: "Sorry",
        text: "No Path Found!",
        icon: "error",
        button: "no!",
    });
}

//Instrunctions
function instruction() {
    swal({
        title: ">>Mars Manual<<",
        text: "1.Click within the white grid and drag your mouse to draw obstacles.\n\n2.Drag the green node to set the start position.\n\n3.Drag the red node to set the end position.\n\n4.Selecting Single Destination( see Right Panel ) will find the shortest path between one source and one destination\n\n5.Select Algorithm from dropdown,if Single Destination option is selected\n\n6.Selecting Multiple Destinations( see Right Panel )will find the shortest path visiting every destination and returning to the source.\n\n7.Click Start Search in the right panel to start the animation.\n\n8.Click on the 'Mars Rover Range' Button (top left) to know the farthest distance Mars Rover can travel with current battery",
        button: "Let's Go",
    });

}

//Reminder when Multiple Destinations is selected
function remind() {
    swal({
        title: ">>Mars Manual<<",
        text: "In Multiple Destinations Case: \n\n First Click on white Cell will convert it to a Wall\n\nSecond click on same cell will convert it into Destination\n\nThird Click will make it white Cell again",
        button: "Let's Go",
    });
}

//Notification of Low Battery
function battery_low() {
    swal({
        title: "Sorry!!",
        text: "Battery is too Low.Recharge the battery first!!",
        icon: "error",
        button: "OK",
    });
}

//Recharge battery
function recharge() {
    if (new_battery == 100) {
        swal("Battery Already Full!!");
    } else {
        new_battery = 100;
        old_battery =100;
        display_battery();
    }
}

//Animate the current level of battery 
function display_battery() {
    var ii = 0;
    if (ii == 0) {
        ii = 1;
        var elem = document.getElementById("myBar");
        var width = old_battery;
        var id = setInterval(frame, 10);


        function frame() {

            if (width <= 25)
                elem.style.background = 'red';
            else
                elem.style.background = '#ADFF2F';

            elem.style.width = width + "%";
            width--;

            if (width <= new_battery) {
                clearInterval(id);
                ii = 0;
            }
        }
    }
}
