//Mouse-related Operations

$(document).on("mousedown", function(event) {
    //Not the First Click After The Algorihtm
    if (first_time != 3) {

        //If clear grid button is enabled,means no pathfinding search is currently in progress.
        //Then you can only edit the grid 
        if (!document.getElementById("clr").disabled) {

            if (first_time == 1) {

                //Cells to Deafault Value
                for (var i = 0; i < col; i++) {
                    for (var j = 0; j < row; j++) {
                        grid[i][j].showyou(color(255));
                    }
                }

                strt.showyou(color(0, 255, 0))
                end.showyou(color(255, 0, 0));

                first_time = 0;
            }
            //Finding Cell Coordinates!
            //X- coordinate
            var xc = Math.floor(mouseX / w);
            //Y- coordinate
            var yc = Math.floor(mouseY / h);

            //For checking if user has choosed Multi-Dest or Single-Dest
            var yz = document.getElementsByName("algo");

            //Check if the cell is a valid one and that cell is a destination currently.This click will change it to normal one
            if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc].end == true) {

                grid[xc][yc].end = false;
                grid[xc][yc].showyou(color(255));

                $(document).on("mousemove", function(event) {

                    //Current Cordinates of cell on which the mouse is!
                    var xc = Math.floor(mouseX / w);
                    var yc = Math.floor(mouseY / h);

                    if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc] != strt && grid[xc][yc] != end) {
                        grid[xc][yc].end = false;
                        grid[xc][yc].showyou(color(255));
                    }

                });
                $(document).on("mouseup", function(ev) {
                    //Stop the mousemove and mouseup
                    //Ready for Another MouseClick and MouseMove
                    $(this).unbind("mouseup mousemove");
                });

            }
            //Check if the cell is a valid one and that cell is a wall currently.This click will change it to a destination 
            //if multiple destinations option is selected
            else if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc].wall == true && yz[1].checked) {

                grid[xc][yc].wall = false;
                grid[xc][yc].end = true;
                grid[xc][yc].showyou(color(255));

                $(document).on("mousemove", function(event) {

                    //Current Cordinates of cell on which the mouse is!
                    var xc = Math.floor(mouseX / w);
                    var yc = Math.floor(mouseY / h);

                    if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc].wall == true) {
                        grid[xc][yc].wall = false;
                        grid[xc][yc].end = true;
                        grid[xc][yc].showyou(color(255));

                    }

                });

                $(document).on("mouseup", function(ev) {
                    //Stop the mousemove and mouseup
                    //Ready for Another MouseClick and MouseMove
                    $(this).unbind("mouseup mousemove");
                });
            }
            //Check if the cell is a valid one and that cell is a normal one currently.This click will change it to a wall 
            else if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc].wall == false) {

                //Check if the current cell is not Souce and Destination
                if (grid[xc][yc] != strt && grid[xc][yc] != end) {

                    //If only pressed then also make the Cell a obstacle
                    grid[xc][yc].visited = true;
                    grid[xc][yc].wall = true;

                    //Color the Cell
                    grid[xc][yc].showyou(color(100, 100, 100));

                    /**
                     * If the mouse is pressed and moved
                     * make every cell a obstacles excluding Sources and Destination
                     */
                    $(document).on("mousemove", function(ev) {

                        var xc = Math.floor(mouseX / w);
                        var yc = Math.floor(mouseY / h);

                        if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc] != strt && grid[xc][yc] != end) {

                            grid[xc][yc].visited = true;
                            grid[xc][yc].wall = true;
                            grid[xc][yc].showyou(color(100, 100, 100));
                        }
                    });

                    $(document).on("mouseup", function(ev) {
                        //Stop the mousemove and mouseup
                        //Ready for Another MouseClick and MouseMove
                        $(this).unbind("mouseup mousemove");
                    });

                }
                //Checks if selected node is a start cell.Move it according to cursor
                else if (grid[xc][yc] == strt) {
                    //The Current Cell is Source or Dstination
                    //Move the Source or Destination Position 
                    $(document).on("mousemove", function(ev) {
                        document.getElementById('cursor1').style.display = 'block';
                        var cursor = document.getElementById('cursor1');
                        var xc = Math.floor(mouseX / w);
                        var yc = Math.floor(mouseY / h);
                        cursor.style.left = xc * w + w + "px";
                        cursor.style.top = yc * h + 4.3 * h + "px";

                    });

                    $(document).on("mouseup", function(ev) {

                        var xf = Math.floor(mouseX / w);
                        var yf = Math.floor(mouseY / h);
                        document.getElementById('cursor1').style.display = 'none';

                        if (xf >= 0 && yf >= 0 && xf < col && yf < row && grid[xf][yf].wall != true && grid[xf][yf] != end) {
                            grid[xc][yc].wall = false;
                            grid[xc][yc].visited = false;
                            grid[xc][yc].showyou(color(255));

                            strt = grid[xf][yf];
                            strt.showyou(color(0, 255, 0));
                            grid[xf][yf].showyou(color(0, 255, 0));
                        }

                        $(this).unbind("mouseup mousemove");
                    });

                }
                //Checks if selected node is the end node.Move it
                else if (grid[xc][yc] == end) {
                    $(document).on("mousemove", function(ev) {

                        document.getElementById('cursor2').style.display = 'block';
                        var cursor = document.getElementById('cursor2');
                        var xc = Math.floor(mouseX / w);
                        var yc = Math.floor(mouseY / h);
                        cursor.style.left = xc * w + w + "px";
                        cursor.style.top = yc * h + 4.2 * h + "px";

                    });

                    $(document).on("mouseup", function(ev) {

                        var xf = Math.floor(mouseX / w);
                        var yf = Math.floor(mouseY / h);
                        document.getElementById('cursor2').style.display = 'none';

                        if (xf >= 0 && yf >= 0 && xf < col && yf < row && grid[xf][yf].wall != true && grid[xf][yf] != strt) {
                            grid[xc][yc].wall = false;
                            grid[xc][yc].visited = false;
                            grid[xc][yc].showyou(color(255));

                            end = grid[xf][yf];
                            end.showyou(color(255, 0, 0));
                        }
                        $(this).unbind("mouseup mousemove");
                    });
                }
            }
            //Checks if the current cell is wall or not .Make it normal one if Single destinations is ON 
            else if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc].wall == true) {

                //If the Cell is a Obstacle then it can't be Souce or Destination
                grid[xc][yc].visited = false;
                grid[xc][yc].wall = false;
                grid[xc][yc].showyou(color(255));
                $(document).on("mousemove", function(event) {

                    //Current Cordinates of cell on which the mouse is!
                    var xc = Math.floor(mouseX / w);
                    var yc = Math.floor(mouseY / h);
                    if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc] != strt && grid[xc][yc] != end) {
                        grid[xc][yc].visited = false;
                        grid[xc][yc].wall = false;
                        grid[xc][yc].showyou(color(255));
                    }

                });
                $(document).on("mouseup", function(event) {
                    $(this).unbind("mouseup mousemove");
                });
            }
        }
    } else
        first_time = 1;
});
