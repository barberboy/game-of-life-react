var CellStates = {
    DEAD: " dead",
    ALIVE: " alive"
};
var Board = function(height, width, size) {
    this.width = width;
    this.height = height;
    this.size = size;
    this.board = this.create_board(width, height);

};

Board.prototype.create_board = function(height, width) {
    var board = [];
    for (var y = 0; y < width; y++) {
        board[y] = [];
        for (var x = 0; x < height; x++)
            board[y][x] = CellStates.DEAD;
    }
    return board;
};

Board.prototype.changeState = function(y, x) {
    console.log("Selected " + y + ", " + x);
    if (this.board[y][x] == CellStates.DEAD)
        this.board[y][x] = CellStates.ALIVE;
    else
        this.board[y][x] = CellStates.DEAD;

    return true;
};

Board.prototype.cycle = function() {
    var LiveOrDie = [];
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {

            var thisPosX = x;
            var thisPosY = y;
            var MIN_X = 0;
            var MIN_Y = 0;
            var MAX_X = this.width - 1;
            var MAX_Y = this.height - 1;

            var startPosX = (thisPosX - 1 < MIN_X) ? thisPosX : thisPosX - 1;
            var startPosY = (thisPosY - 1 < MIN_Y) ? thisPosY : thisPosY - 1;
            var endPosX = (thisPosX + 1 > MAX_X) ? thisPosX : thisPosX + 1;
            var endPosY = (thisPosY + 1 > MAX_Y) ? thisPosY : thisPosY + 1;

            var livingNeighbors = 0;

            for (var rowNum = startPosY; rowNum <= endPosY; rowNum++) {
                for (var colNum = startPosX; colNum <= endPosX; colNum++) {
                    if (this.board[rowNum][colNum] == CellStates.ALIVE && (rowNum != y || colNum != x))
                        livingNeighbors++;
                }
            }
            switch (this.board[y][x]) {
                case CellStates.DEAD:
                    if (livingNeighbors == 3)
                        LiveOrDie.push({
                            X: x,
                            Y: y
                        });
                    break;
                case CellStates.ALIVE:
                    if (livingNeighbors < 2 || livingNeighbors > 3)
                        LiveOrDie.push({
                            X: x,
                            Y: y
                        });
                    break;
                default:
                    // code
                    break;
            }
        }
    }

    for (var i = 0; i < LiveOrDie.length; i++) {
        if (this.board[LiveOrDie[i].Y][LiveOrDie[i].X] == CellStates.DEAD)
            this.board[LiveOrDie[i].Y][LiveOrDie[i].X] = CellStates.ALIVE;
        else
            this.board[LiveOrDie[i].Y][LiveOrDie[i].X] = CellStates.DEAD;
    }
    return true;
}
