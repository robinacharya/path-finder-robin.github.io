//Dijkstra ALgorithm Implementation :)

//function for producing delay in execution
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Algorithm Starts here
async function Dijkstra() {

    //hold cells that are yet to be visited
    var que = new Queue();

    var ok = false;

    //Every time algorithm runs,the cells are loaded with default values
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {

            grid[i][j].showyou(color(255));
            grid[i][j].camefrom = null;
            grid[i][j].visited = false;
            grid[i][j].neighbours = [];
        }
    }

    //Adding reachable neighbours of every cell.Why?.because the user may have added a new wall before running algo.
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].addneighbours(grid);
        }
    }

    //Inserting the source cell in the queue
    que.enqueue(new QItem(strt.i, strt.j, 0));

    //Array for keeping the visited cell
    var closedSet = [];

    var check = false;

    //While all the cells have been traversed or the END has been found 
    while (!que.isEmpty()) {

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

        var p = que.front();
        que.dequeue();
        closedSet.push(p);

        //Hurrah!! We reached our destination
        if (grid[p.row][p.col] === end) {

            check = true;
            var x = grid[p.row][p.col];

            var path = [];
            var temp = x;
            path.push(temp);

            //Extracting the minimum cost path
            while (true) {

                path.push(temp.camefrom);
                temp = temp.camefrom;
                if (temp == strt || x == null) {
                    path.push(temp);
                    break;
                }
            }

            //if enough battery is available,then traverse
            if (new_battery - (0.5 * (path.length - 2)) >= 0) {

                noFill();
                stroke(255, 245, 102);
                strokeWeight(w / 7);
                beginShape();

                for (var i = 0; i < path.length; i++) {
                    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
                }
                success(path.length - 2);
                endShape();
                old_battery = new_battery;
                new_battery -= 0.5 * (path.length - 2);
                display_battery();
            } else {
                battery_low();
            }
            break;

        } else {

            var neigh = grid[p.row][p.col].neighbours;

            //traversing through current cell's neighbours
            for (var i = 0; i < neigh.length; i++) {

                var neighbor = neigh[i];

                //if not visited,visit it
                if (!neighbor.visited) {
                    que.enqueue(new QItem(neighbor.i, neighbor.j, p.dist + 1));
                    neighbor.visited = true;
                    neighbor.camefrom = grid[p.row][p.col];
                }
            }
        }

        //If path has not been found keep colouring the grid
        if (!check) {

            for (var i = 0; i < que.items.length; i++)
                grid[que.items[i].row][que.items[i].col].showyou(color(177, 250, 82));

            for (var i = 0; i < closedSet.length; i++)
                grid[closedSet[i].row][closedSet[i].col].showyou(color(74, 247, 244));

            strt.showyou(color(0, 255, 0));
            end.showyou(color(255, 0, 0));
            await sleep(5);
        }
    }

    //If no path is found
    if (!check && que.isEmpty()) {
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

    //end of Dijkstra Implementation :) 
}
