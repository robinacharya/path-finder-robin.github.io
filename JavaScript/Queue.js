//Queue and Priority Queue Implementation :)

//Property of each Queue element
class QItem {
    constructor(x, y, w) {
        this.row = x;
        this.col = y;
        this.dist = w;
    }
}

//Implementation of Queue
class Queue {

    //Array Is Used to Implement Queue 
    constructor() {
        this.items = [];
    }

    //Push In the Array!!
    enqueue(element) {
        this.items.push(element);
    }

    //Dequeue element 
    dequeue() {
        if (this.isEmpty()) return "Underflow";
        return this.items.shift();
    }

    //Front Element 
    front() {
        if (this.isEmpty()) return "No elements in Queue";
        return this.items[0];
    }

    //IsEmpty function 
    isEmpty() {
        return this.items.length == 0;
    }
}

//Property of each priority_queue element
class queue_element {
    constructor(i, j) {

        this.element = grid[i][j];
        this.priority = grid[i][j].f;
    }
}

//Implementation of Priority Queue
class priority_queue {

    constructor() {
        this.items = [];
    }

    //Insert in queue
    enqueue(i, j) {

        var ele = new queue_element(i, j);
        var contain = false;

        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > ele.priority) {
                this.items.splice(i, 0, ele);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(ele);
        }
    }

    //Remove
    dequeue() {

        this.items.splice(0, 1);
    }

    //Front Element
    front() {
        return this.items[0];
    }

    isEmpty() {
        return this.items.length == 0;
    }
}

//IMP:
//The functions here have been declared in that manner other than
//    isEmpty=function(){...}
//because this syntax was causing error in Microsoft Edge.