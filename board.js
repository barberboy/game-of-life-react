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

Board.prototype.clear_board = function() {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++)
            this.board[y][x] = CellStates.DEAD;
    }
}

Board.prototype.seed = function(seed){
    if(seed == "Glider")
    {
        this.board[0][0] = CellStates.ALIVE;
        this.board[1][1] = CellStates.ALIVE;
        this.board[2][0] = CellStates.ALIVE;
        this.board[1][2] = CellStates.ALIVE;
        this.board[2][1] = CellStates.ALIVE;
    }
    else if(seed == "Pulsar"){
        this.board[4][5] = CellStates.ALIVE;
        this.board[3][5] = CellStates.ALIVE;
        this.board[5][5] = CellStates.ALIVE;
        this.board[5][6] = CellStates.ALIVE;
        this.board[5][10] = CellStates.ALIVE;
        
        this.board[5][11] = CellStates.ALIVE;
        this.board[3][11] = CellStates.ALIVE;
        this.board[4][11] = CellStates.ALIVE;
        this.board[7][6] = CellStates.ALIVE;
        this.board[7][7] = CellStates.ALIVE;
        
        this.board[8][5] = CellStates.ALIVE;
        this.board[9][5] = CellStates.ALIVE;
        this.board[9][6] = CellStates.ALIVE;
        this.board[8][7] = CellStates.ALIVE;
        this.board[7][10] = CellStates.ALIVE;
        
        this.board[7][9] = CellStates.ALIVE;
        this.board[8][9] = CellStates.ALIVE;
        this.board[9][10] = CellStates.ALIVE;
        this.board[9][11] = CellStates.ALIVE;
        this.board[8][11] = CellStates.ALIVE;
        
        this.board[7][13] = CellStates.ALIVE;
        this.board[7][14] = CellStates.ALIVE;
        this.board[7][15] = CellStates.ALIVE;
        this.board[8][13] = CellStates.ALIVE;
        this.board[7][3] = CellStates.ALIVE;
        
        this.board[7][2] = CellStates.ALIVE;
        this.board[7][1] = CellStates.ALIVE;
        this.board[8][3] = CellStates.ALIVE;
        this.board[11][6] = CellStates.ALIVE;
        this.board[11][5] = CellStates.ALIVE;
        
        this.board[12][5] = CellStates.ALIVE;
        this.board[11][10] = CellStates.ALIVE;
        this.board[11][11] = CellStates.ALIVE;
        this.board[12][9] = CellStates.ALIVE;
        this.board[12][11] = CellStates.ALIVE;
        this.board[13][9] = CellStates.ALIVE;
        
        this.board[13][10] = CellStates.ALIVE;
        this.board[12][7] = CellStates.ALIVE;
        this.board[13][7] = CellStates.ALIVE;
        this.board[13][6] = CellStates.ALIVE;
        this.board[13][3] = CellStates.ALIVE;
        this.board[12][3] = CellStates.ALIVE;
        
        this.board[13][2] = CellStates.ALIVE;
        this.board[13][1] = CellStates.ALIVE;
        this.board[13][13] = CellStates.ALIVE;
        this.board[12][13] = CellStates.ALIVE;
        this.board[13][14] = CellStates.ALIVE;
        
        this.board[13][15] = CellStates.ALIVE;
        this.board[15][6] = CellStates.ALIVE;
        this.board[15][5] = CellStates.ALIVE;
        this.board[16][5] = CellStates.ALIVE;
        this.board[17][5] = CellStates.ALIVE;
        this.board[15][10] = CellStates.ALIVE;
        
        this.board[15][11] = CellStates.ALIVE;
        this.board[16][11] = CellStates.ALIVE;
        this.board[17][11] = CellStates.ALIVE;
    }
    else if (seed == "Pentadecathlon"){
        this.board[4][3] = CellStates.ALIVE;
        this.board[4][4] = CellStates.ALIVE;
        this.board[3][5] = CellStates.ALIVE;
        this.board[5][5] = CellStates.ALIVE;
        this.board[4][6] = CellStates.ALIVE;
        
        this.board[4][7] = CellStates.ALIVE;
        this.board[4][8] = CellStates.ALIVE;
        this.board[4][9] = CellStates.ALIVE;
        this.board[3][10] = CellStates.ALIVE;
        this.board[5][10] = CellStates.ALIVE;
        
        this.board[4][11] = CellStates.ALIVE;
        this.board[4][12] = CellStates.ALIVE;
    }
    else if(seed =="Lightweight spaceship"){
        console.log("hsld;fj")
        this.board[0][0] = CellStates.ALIVE;
        this.board[2][0] = CellStates.ALIVE;
        this.board[3][1] = CellStates.ALIVE;
        this.board[3][2] = CellStates.ALIVE;
        this.board[3][3] = CellStates.ALIVE;
        
        this.board[3][4] = CellStates.ALIVE;
        this.board[2][4] = CellStates.ALIVE;
        this.board[1][4] = CellStates.ALIVE;
        this.board[0][3] = CellStates.ALIVE;
    }
}

Board.prototype.random_seed = function()
{
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++){
            if (Math.floor(Math.random() * (1 - 0 + 1)) + 0 == 1)
                this.board[y][x] = CellStates.DEAD;
            else
                this.board[y][x] = CellStates.ALIVE;
        }
    }
    Math.floor(Math.random() * (1 - 0 + 1)) + 0;
}

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
