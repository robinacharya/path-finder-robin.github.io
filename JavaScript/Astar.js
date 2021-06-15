//A* Implementation :)

var check = false;

//Algorithm Starts here
async function Astar() {

    //Creating a priority_queue for storing the unvisited cells
    pqueue = new priority_queue();
    check = false;

    //Re-initialising the property of each cell to its default value
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {

            grid[i][j].g = Infinity;
            grid[i][j].f = Infinity;
            grid[i][j].visited = false;
            grid[i][j].camefrom = null;
            grid[i][j].neighbours = [];
            grid[i][j].showyou(color(255));
        }
    }

    strt.g = 0;
    strt.f = dist(str.i, str.j, end.i, end.j); //Math.abs(strt.i - end.i) + Math.abs(strt.j - end.j);

    //Inserting the source cell
    pqueue.enqueue(strt.i, strt.j);

    //For keeping the Visited Cell
    var closedset = [];

    //Adding reachable neighbours of every cell.Why?.because the user may have added a new wall before running algo. 
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].addneighbours(grid);
        }
    }

    //While all the cells have been traversed or the END has been found 
    while (!pqueue.isEmpty()) {

        //if the user clicks Cancel Search,abort=true
        if (abort) {
            abort = false;
            for (var i = 0; i < col; i++) {
                for (var j = 0; j < row; j++)
                    grid[i][j].showyou(color(255));
            }
            strt.showyou(color(0, 255, 0));
            end.showyou(color(255, 0, 0));
            break;
        }

        var current = pqueue.front().element;

        //Hurrah!! We reached our destination
        if (current === end) {
            check = true;

            var path = [];
            var temp = current;
            path.push(current);

            //Extract the minimum cost path
            while (temp.camefrom) {
                path.push(temp.camefrom);
                temp = temp.camefrom;
            }

            //if enough battery is available
            if (new_battery - (0.5 * (path.length - 1)) >= 0) {
                noFill();
                stroke(255, 245, 102);
                strokeWeight(w / 5);
                beginShape();
                for (var i = 0; i < path.length; i++) {
                    old_battery = new_battery;
                    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
                }
                endShape();
                var c = path.length;
                c--;
                old_battery = new_battery;
                new_battery -= 0.5 * c;
                success(c);
                display_battery();

            } else {
                battery_low();
            }
            break;
        } else {
            pqueue.dequeue();

            closedset.push(current);

            var neigh = current.neighbours;

            //Traversing all neighbours
            for (var i = 0; i < neigh.length; i++) {

                var neighbor = neigh[i];
                //If that neighbour is not visited
                if (!neighbor.visited) {

                    neighbor.visited = true;
                    //new g value of neighbor
                    var tempG = current.g + 1;

                    //if new g value is samller than previos g value,update it
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        neighbor.camefrom = current;
                    }

                    //Heuristic Value.Used Euclidean here
                    var temph = dist(neighbor.i, neighbor.j, end.i, end.j); //Math.abs(neighbor.i - end.i) + Math.abs(neighbor.j - end.j);
                    //new cost
                    var newcost = neighbor.g + temph;
                    //if new cost is smaller than previos cell's cost 

                    if (newcost < neighbor.f) {
                        neighbor.h = temph;
                        neighbor.f = newcost;
                        pqueue.enqueue(neighbor.i, neighbor.j);
                    }
                }
            }
        }

        //If path has not been found keep colouring the grid
        if (!check) {
            for (var i = 0; i < pqueue.items.length; i++) {
                pqueue.items[i].element.showyou(color(177, 250, 82));
            }

            for (var i = 0; i < closedset.length; i++) {
                closedset[i].showyou(color(74, 247, 244));
            }

            strt.showyou(color(0, 255, 0));
            end.showyou(color(255, 0, 0));
            await sleep(15);
        }
    }

    //Path not found
    if (!check && pqueue.isEmpty()) {
        fail();
        strt.showyou(color(0, 255, 0));
        end.showyou(color(255, 0, 0));
    }

    //Enabling of Clear and Start button after Search completes.
    document.getElementById("clr").disabled = false;
    document.getElementById("strt").disabled = false;

    //Disabling of Cancel Search button after Search completes
    document.getElementById("can").disabled = true;
    first_time = 3;
}
//end of the A* implementation