/* global React */
/* global Board */
"use strict";

var GRID_SIZE = 10;
var BOARD_WIDTH = 60;
var BOARD_HEIGHT = 30;

var PlayButton = React.createClass({
    displayName: "PlayButton",

    text: "Play",
    interval: null,
    run: function run() {
        this.props.board.cycle();
        this.props.onPlay();
    },
    handleClick: function handleClick() {
        if (this.text == "Play") {
            this.interval = setInterval(this.run, 500);
            this.text = "Stop";
        } else {
            window.clearInterval(this.interval);
            this.text = "Play";
        }
        this.props.onPlay();
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "playbutton" },
            React.createElement(
                "button",
                { onClick: this.handleClick, type: "button" },
                this.text
            )
        );
    }
});

var ClearButton = React.createClass({
    displayName: "ClearButton",

    text: "Clear",
    handleClick: function handleClick() {
        this.props.board.clear_board();
        this.props.onPlay();
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "clearbutton" },
            React.createElement(
                "button",
                { onClick: this.handleClick, type: "button" },
                this.text
            )
        );
    }
});

var RandomSeedButton = React.createClass({
    displayName: "RandomSeedButton",

    text: "Random Seed",
    handleClick: function handleClick() {
        this.props.board.random_seed();
        this.props.onPlay();
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "randomseedbutton" },
            React.createElement(
                "button",
                { onClick: this.handleClick, type: "button" },
                this.text
            )
        );
    }
});

var Seed = React.createClass({
    displayName: "Seed",

    handleClick: function handleClick() {
        console.log(this.props.item);
        this.props.board.clear_board();
        this.props.board.seed(this.props.item);
        this.props.onPlay();
    },
    render: function render() {
        return React.createElement(
            "option",
            { onClick: this.handleClick },
            this.props.item
        );
    }
});

var SeedSelect = React.createClass({
    displayName: "SeedSelect",

    render: function render() {
        return React.createElement(
            "select",
            null,
            React.createElement(Seed, { item: "Glider", board: this.props.board, onPlay: this.props.onPlay }),
            React.createElement(Seed, { item: "Pulsar", board: this.props.board, onPlay: this.props.onPlay }),
            React.createElement(Seed, { item: "Pentadecathlon", board: this.props.board, onPlay: this.props.onPlay }),
            React.createElement(Seed, { item: "Lightweight spaceship", board: this.props.board, onPlay: this.props.onPlay })
        );
    }
});

var BoardCell = React.createClass({
    displayName: "BoardCell",

    handleClick: function handleClick() {
        if (this.props.board.changeState(this.props.y, this.props.x)) this.props.onPlay();
    },
    render: function render() {
        var style = {
            top: this.props.y * GRID_SIZE,
            left: this.props.x * GRID_SIZE
        };

        var classes = "cell";
        classes += this.props.cell;
        return React.createElement("div", { onClick: this.handleClick, className: classes, style: style });
    }
});

var BoardView = React.createClass({
    displayName: "BoardView",

    render: function render() {

        var cells = [];
        for (var i = 0; i < this.props.board.height; i++) for (var j = 0; j < this.props.board.width; j++) {
            cells.push(React.createElement(BoardCell, { board: this.props.board,
                cell: this.props.board.board[i][j],
                y: i,
                x: j,
                onPlay: this.props.onPlay,
                key: j + "" + i + j }));
        }

        var style = {
            width: this.props.board.width * GRID_SIZE,
            height: this.props.board.height * GRID_SIZE
        };

        return React.createElement(
            "div",
            { style: style, id: "board" },
            cells
        );
    }
});

var board = new Board(BOARD_HEIGHT, BOARD_WIDTH, GRID_SIZE);

var ContainerView = React.createClass({
    displayName: "ContainerView",

    getInitialState: function getInitialState() {
        return {
            'board': this.props.board
        };
    },
    onBoardUpdate: function onBoardUpdate() {
        this.setState({
            "board": this.props.board
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(PlayButton, { board: this.state.board, onPlay: this.onBoardUpdate }),
            React.createElement(ClearButton, { board: this.state.board, onPlay: this.onBoardUpdate }),
            React.createElement(RandomSeedButton, { board: this.state.board, onPlay: this.onBoardUpdate }),
            React.createElement(SeedSelect, { board: this.state.board, onPlay: this.onBoardUpdate }),
            React.createElement(BoardView, { board: this.state.board, onPlay: this.onBoardUpdate })
        );
    }
});

React.render(React.createElement(ContainerView, { board: board }), document.getElementById('main'));
