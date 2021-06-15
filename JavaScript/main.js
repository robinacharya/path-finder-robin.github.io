//Running algorithm on user-input

$(document).ready(function() {

    //if start search button is click
    $('#strt').click(function() {
        var elem = document.getElementById("butt");
        elem.value = "Mars Rover Range";

        document.getElementById("clr").disabled = true;
        document.getElementById("strt").disabled = true;
        document.getElementById("can").disabled = false;

        //Checking if Single Dest or Multiple Dest. is selected 
        var x = document.getElementsByName("algo");

        //If Single dest. is selected
        if (x[0].checked) {

            //getting input from drop-down
            var value = $("#algorithm-panel option:selected");

            switch (value.text()) {
                case "Dijkstra": //Dijkstra Algo is Selected
                    Dijkstra();
                    break;

                case "A*": //A* algo is selected
                    Astar();
                    break;

                case "Range":
                    Rem();
                    break;
                default: //If no algo is selected
                    swal({
                        text: "Please Select a Algorithm to Start !!",
                        icon: "info",
                        button: "OK",
                    });
                    document.getElementById("clr").disabled = false;
                    document.getElementById("strt").disabled = false;
                    document.getElementById("can").disabled = true;
                    break;

            }
        }
        //If Multiple Destinations is selected
        else if (x[1].checked) {
            reminder = true;
            calc_dis();
        }
    });

    //On clicking Clear Button
    $('#clr').click(function() {

        for (var i = 0; i < col; i++) {
            for (var j = 0; j < row; j++) {
                grid[i][j].wall = false;
                grid[i][j].end = false;
                grid[i][j].showyou(color(255));
            }
        }
        strt.showyou(color(0, 255, 0))
        end.showyou(color(255, 0, 0));
    });

    //On clicking Cancel Search button
    $('#can').click(function() {
        abort = true;
    });
});