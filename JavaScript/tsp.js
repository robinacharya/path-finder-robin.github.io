//Travelling Salseman Problem Implementation Using Dynammic Programming(Held-Karp Method).Time Complexity:O(N*N*2^N)

var distance;
var pathorigin;
var destination;
var check = false;
var path = [];
var temp;
var z = 0;


class TSP {

    //Initialising properties    
    constructor(strt, distance) {
        this.start_node = strt;
        this.distance = distance;
        this.N = distance.length;
        this.finish_state = (1 << this.N) - 1;
        this.mintourcost = Infinity;
        this.ransolver = false;
        this.tour = [];
    }

    recursive_tsp(curr, state, memo, prev) {


        if (state == this.finish_state)
            return this.distance[curr][this.start_node];

        //if computed in past,use that    
        if (memo[curr][state] != -1)
            return memo[curr][state];

        var mincost = Infinity;
        var index = -1;

        for (var i = 0; i < this.N; i++) {
            if ((state & (1 << i)) != 0)
                continue;

            var nextState = (state | (1 << i));
            var newcost = this.distance[curr][i] + this.recursive_tsp(i, nextState, memo, prev);

            //update minimum
            if (newcost < mincost) {
                mincost = newcost;
                index = i;
            }
        }

        prev[curr][state] = index;
        return memo[curr][state] = mincost;
    }

    solve() {
        var state = (1 << this.start_node);
        var memo = new Array(this.N);

        for (var i = 0; i < this.N; i++)
            memo[i] = new Array(1 << this.N);

        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < (1 << this.N); j++) {
                memo[i][j] = -1;
            }
        }

        var prev = new Array(this.N);

        for (var i = 0; i < this.N; i++)
            prev[i] = new Array(1 << this.N);

        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < (1 << this.N); j++) {
                prev[i][j] = -1;
            }
        }
        this.minTourCost = this.recursive_tsp(this.start_node, state, memo, prev);

        var index = this.start_node;

        while (true) {
            this.tour.push(index);
            var nextIndex = prev[index][state];

            if (nextIndex == -1)
                break;
            var nextState = (state | (1 << nextIndex));
            state = nextState;
            index = nextIndex;
        }
        this.tour.push(this.start_node);
        this.ranSolver = true;

    }

    getTourCost() {
        if (!this.ranSolver)
            this.solve();

        this.tour.push(this.minTourCost);
        return this.tour;
    }
}

//Main function.starts from here!
function calc_dis() {

    var count = 2;

    //stores all the cells which we have to visit,including strt node
    destination = [];

    destination.push(strt);
    destination.push(end);

    //push all the cells to be visited in destination array
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++)
            if (grid[i][j].end) {
                count++;
                destination.push(grid[i][j]);
            }
    }

    distance = new Array(count);
    pathorigin = new Array(count);

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++)
            grid[i][j].neighbours = [];
    }


    //Adding reachable neighbours of every cell.Why?.because the user may have added a new wall before running algo. 
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].addneighbours(grid);
        }
    }

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].showyou(color(255));
        }
    }

    strt.showyou(color(0, 255, 0));

    for (var i = 1; i < destination.length; i++)
        destination[i].showyou(color(255, 0, 0));

    //Creating a 2D matrix for storing distance between each pair of cell(to be visited)
    for (var i = 0; i < count; i++)
        distance[i] = new Array(count);

    for (var i = 0; i < count; i++)
        pathorigin[i] = new Array(count);

    for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++)
            pathorigin[i][j] = -1;
    }

    //Initialising distance to Infinity
    for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++) {
            if (i == j)
                distance[i][j] = 0;
            else
                distance[i][j] = Infinity;
        }
    }
    travellingsalesman();
}

async function travellingsalesman() {

    //First we need to find shortest distance between each pair of city.
    //For this we have used A* algo to find shortest path and store it in the distance matrix
    for (var a = 0; a < destination.length; a++) {

        for (var b = 0; b < destination.length; b++) {

            //We don't have to go the city from same city
            if (a == b)
                continue;

            //For calculating distance everytime,first we have to clear the previous effect on grid
            for (var i = 0; i < col; i++) {
                for (var j = 0; j < row; j++) {

                    grid[i][j].g = Infinity;
                    grid[i][j].f = Infinity;
                    grid[i][j].h = Infinity;
                    grid[i][j].visited = false;
                    grid[i][j].camefrom = null;
                }
            }

            //Current Starting node : destination[a]
            //Current Final node : destination[b]
            var partial_end = destination[b];

            //The code from here is same as A* algo implementation

            //Creating a new priority_queue
            var pqueue = new priority_queue();

            destination[a].g = 0;
            destination[a].f = Math.abs(destination[a].i - partial_end.i) + Math.abs(destination[a].j - partial_end.j);
            //Starting from the source
            pqueue.enqueue(destination[a].i, destination[a].j);

            //While all the cells have been traversed or the END has been found 
            while (!pqueue.isEmpty()) {

                var current = pqueue.front().element;

                //path found
                if (current === partial_end) {
                    check = true;

                    //for storing the shortest path found,so that we don't have to calculate later on 
                    path[z] = new Array(1);
                    temp = current;
                    path[z].push(current);

                    while (temp.camefrom) {
                        path[z].push(temp.camefrom);
                        temp = temp.camefrom;
                    }
                    //Storing the distance from city A to city B
                    distance[a][b] = path[z].length;
                    //storing at which index of path array ,the current path to go from A to B is stored
                    pathorigin[a][b] = z;
                    z++;
                    break;

                } else {

                    pqueue.dequeue();

                    //taking all the neighbors of current cell
                    var neigh = current.neighbours;

                    for (var i = 0; i < neigh.length; i++) {
                        var neighbor = neigh[i];
                        //if that neighbour is not visited
                        if (!neighbor.visited) {
                            neighbor.visited = true;
                            var tempG = current.g + 1;

                            if (tempG < neighbor.g) {
                                neighbor.g = tempG;
                                neighbor.camefrom = current;
                            }
                            var temph = Math.abs(neighbor.i - partial_end.i) + Math.abs(neighbor.j - partial_end.j); //Math.sqrt((neighbor.i - end.i) * (neighbor.i - end.i) + (neighbor.j - end.j) * (neighbor.j - end.j)); //Math.abs(neighbor.i - end.i) + Math.abs(neighbor.j - end.j);
                            var newcost = neighbor.g + temph;

                            if (newcost < neighbor.f) {
                                neighbor.h = temph;
                                neighbor.f = newcost;
                                pqueue.enqueue(neighbor.i, neighbor.j);
                            }
                        }
                    }

                }
                //A* ends here
            }
        }
    }
    var obj = new TSP(0, distance);

    //for storing the shortest path to follow to visit all city
    var shortest_path = [];


    shortest_path = obj.getTourCost();

    //No common Path found 
    if (shortest_path[shortest_path.length - 1] == Infinity) {
        swal({
            title: "Sorry!",
            text: "No common path found!!",
            icon: "error",
            button: "noo!",
        });

    } else {

        var cnt = 0;
        noFill();
        stroke(0, 0, 0);
        strokeWeight(w / 5);

        beginShape();

        //Checking sufficient battery is there or not
        if ((new_battery - (0.5 * (shortest_path[shortest_path.length - 1] - destination.length))) >= 0) {

            for (var i = 0; i < shortest_path.length - 2; i++) {

                //now using that path stored in path array.
                for (var j = path[pathorigin[shortest_path[i]][shortest_path[i + 1]]].length - 1; j >= 1; j--) {

                    path[pathorigin[shortest_path[i]][shortest_path[i + 1]]][j].showyou(color(0, 0, 255));
                    cnt++;

                    destination[0].showyou(color(0, 255, 0));

                    for (var k = 1; k < destination.length; k++)
                        destination[k].showyou(color(255, 0, 0));

                    if (abort) {

                        for (var i = 0; i < col; i++) {
                            for (var j = 0; j < row; j++)
                                grid[i][j].showyou(color(255));
                        }
                        strt.showyou(color(0, 255, 0));
                        end.showyou(color(255, 0, 0));
                        break;
                    }

                    await sleep(100);
                    path[pathorigin[shortest_path[i]][shortest_path[i + 1]]][j].showyou(color(74, 247, 244));

                }
                if (abort)
                    break;
            }
            endShape();

            destination[0].showyou(color(0, 255, 0));

            for (var k = 1; k < destination.length; k++)
                destination[k].showyou(color(255, 0, 0));

            if (!abort) {
                cnt -= destination.length;
                success(cnt);
                old_battery = new_battery;
                new_battery -= 0.5 * shortest_path[shortest_path.length - 1];
                display_battery();
            }
        } else {
            battery_low();
        }
    }

    document.getElementById("clr").disabled = false;
    document.getElementById("strt").disabled = false;
    document.getElementById("can").disabled = true;
    first_time = 3;
    abort = false;
}

//Implementation Ends here