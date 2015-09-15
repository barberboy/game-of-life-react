
/* global React */
/* global Board */
var GRID_SIZE = 10;
var BOARD_WIDTH = 60;
var BOARD_HEIGHT = 30;

var PlayButton = React.createClass({
    text: "Play",
    interval:null,
    run: function() {
        this.props.board.cycle();
        this.props.onPlay();
    },
    handleClick: function() {
        if (this.text == "Play") {
            this.interval = setInterval(this.run, 500);
            this.text = "Stop";
        }
        else {
            window.clearInterval(this.interval);
            this.text = "Play";
        }
        this.props.onPlay();
    },
    render: function() {
        return (
            <div className="playbutton">
             <button onClick={this.handleClick} type="button">{this.text}</button> 
            </div>
        )
    }
});

var ClearButton = React.createClass({
    text: "Clear",
    handleClick: function() {
        this.props.board.clear_board();
        this.props.onPlay();
    },
    render: function() {
        return (
            <div className="clearbutton">
             <button onClick={this.handleClick} type="button">{this.text}</button> 
            </div>
        )
    }
});

var RandomSeedButton = React.createClass({
    text: "Random Seed",
    handleClick: function() {
        this.props.board.random_seed();
        this.props.onPlay();
    },
    render: function() {
        return (
            <div className="randomseedbutton">
             <button onClick={this.handleClick} type="button">{this.text}</button> 
            </div>
        )
    }
});

var Seed = React.createClass({
    handleClick: function(){
        this.props.board.clear_board();
        this.props.board.seed(this.props.item);
        this.props.onPlay();
    },
    render: function(){
        return(<option onClick={this.handleClick}>{this.props.item}</option>)
    }
});

var SeedSelect = React.createClass({
    render: function() {
        return (
            <select>
                <Seed item={"Glider"} board={this.props.board} onPlay={this.props.onPlay} />
                <Seed item={"Pulsar"} board={this.props.board} onPlay={this.props.onPlay} /> 
                <Seed item={"Pentadecathlon"} board={this.props.board} onPlay={this.props.onPlay} /> 
                <Seed item={"Lightweight spaceship"} board={this.props.board} onPlay={this.props.onPlay} /> 
            </select>
        )
    }
});

var BoardCell = React.createClass({
    handleClick: function() {
        if (this.props.board.changeState(this.props.y, this.props.x))
            this.props.onPlay();
    },
    render: function() {
        var style = {
            top: this.props.y * GRID_SIZE,
            left: this.props.x * GRID_SIZE
        };

        var classes = "cell";
        classes += this.props.cell;
        return (
            <div onClick={this.handleClick} className={classes} style={style}></div>
        );
    }
});

var BoardView = React.createClass({
    render: function() {
        
        var cells = [];
        for (var i = 0; i < this.props.board.height; i++)
            for (var j = 0; j < this.props.board.width; j++) {
                cells.push(<BoardCell board={this.props.board}
                                      cell={this.props.board.board[i][j]} 
                                      y={i} 
                                      x={j} 
                                      onPlay={this.props.onPlay}
                                      key={j+""+i+j}/>)
            }
            
        var style = {
            width: this.props.board.width * GRID_SIZE,
            height: this.props.board.height * GRID_SIZE
        };
        
        return <div style={style} id="board" >{cells}</div>;
    }
});

var board = new Board(BOARD_HEIGHT, BOARD_WIDTH, GRID_SIZE);


var ContainerView = React.createClass({
    getInitialState: function() {
        return {
            'board': this.props.board
        };
    },
    onBoardUpdate: function() {
        this.setState({
            "board": this.props.board
        });
    },
    render: function() {
        return (
            <div>
                <PlayButton board={this.state.board} onPlay={this.onBoardUpdate}/>
                <ClearButton board={this.state.board} onPlay={this.onBoardUpdate}/>
                <RandomSeedButton board={this.state.board} onPlay={this.onBoardUpdate}/>
                <SeedSelect board={this.state.board} onPlay={this.onBoardUpdate} />
                <BoardView board={this.state.board} onPlay={this.onBoardUpdate} />
            </div>
        );
    }
});



React.render(
    <ContainerView board={board} />,
    document.getElementById('main')
);