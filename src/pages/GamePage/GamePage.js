import React, { Component } from 'react';
import './GamePage.scss';   
import GameOpts from '../../components/GameOpts';
import GameBoard from '../../components/GameBoard';
import GamePanel from '../../components/GamePanel';

export default class GamePage extends Component {
    state = {
        rows: 6,
        cols: 7,
        player1: {},
        player2: {},
        pcMode: true,
        optsSubmitted: false,
        isGameOn: false,
        isVictory: false,
        board: [],
        currPlayer: 1,
        successionForVictory: 4,
        msg: '',
    }

    initBoard = () => {
        const { rows, cols } = this.state;
        const board = this.createBoard(rows, cols);
        this.setState({ ...this.state, board, currPlayer: 1, isGameOn: true, msg: '', isVictory: false });
    }

    createBoard = (rows, cols) => {
        const board = [];
        for (let i = 0; i < rows; i++) {
            board.push([]);
            for (let j = 0; j < cols; j++) {
                board[i][j] = null;
            }
        }
        return board;
    }

    handleOptsSubmit = (opts) => {
        this.setState({ ...this.state, ...opts })
        setTimeout(() => {
            this.initBoard();
        }, 0);
    }

    handleCellClicked = (col) => {
        this.setState({ ...this.state })
        let copyBoard = JSON.parse(JSON.stringify(this.state.board));

        let row = this.findFreeRow(copyBoard, col);
        if (row >= 0 && !copyBoard[row][col] && !this.state.isVictory && this.state.isGameOn) {

            copyBoard[row][col] = this.state.currPlayer;

            let nextPlayer = this.togglePlayer(this.state.currPlayer);

            const isVictory = this.checkVictory(copyBoard, row, col, this.state.currPlayer);
            if (isVictory) {
                const winningPlayer = this.state.currPlayer === 1 ? this.state.player1 : this.state.player2;
                
                this.setState({
                    ...this.state,
                    board: copyBoard,
                    isGameOn: false,
                    isVictory: true,
                    msg: `🏆Player ${winningPlayer.number} - ${winningPlayer.name} wins!🏆`
                });

            } else {
                const isGameTied = this.checkGameTie(copyBoard, this.state.rows, this.state.cols);
                if (isGameTied) {
                    this.setState({ ...this.state, isGameOn: false, isVictory: false, msg: 'Game is tied!' });
                } else {
                    this.setState({ ...this.state, board: copyBoard, currPlayer: nextPlayer });

                    if (nextPlayer === 2 && this.state.pcMode) {
                        setTimeout(() => {
                            let randomInt = this.getRandomIntInclusive(0, this.state.cols - 1);
                            this.handleCellClicked(randomInt);
                        }, 500);
                    }
                }
            }
        }

    }

    checkGameTie(board, rows, cols) {

        let filledCells = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (board[i][j]) filledCells++;
            }
        }

        return filledCells === rows * cols;
    }

    checkVictory(board, row, col, player) {
        const { successionForVictory } = this.state;

        let i;
        let isVictory = 0;

        isVictory += this.checkSuccessionCol(board, row, col, player);
        for (i = col; i > col - successionForVictory; i--) {
            isVictory += this.checkSuccessionRow(board, row, i, player);
        }
        for (i = col; i > col - successionForVictory; i--) {
            isVictory += this.checkSuccessionDiagonal1(board, row + i - col, i, player);
        }
        for (i = col; i > col - successionForVictory; i--) {
            isVictory += this.checkSuccessionDiagonal2(board, row - i + col, i, player);
        }
        return Boolean(isVictory);
    }

    getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    checkSuccessionDiagonal1(board, row, col, player) {
        const { successionForVictory } = this.state;

        let res = 0;
        for (let i = col; i < col + successionForVictory; i++) {
            res += board[row + i - col] && board[row + i - col][i] === player;
        }
        return res === successionForVictory;
    }

    checkSuccessionDiagonal2(board, row, col, player) {
        const { successionForVictory } = this.state;

        let res = 0;
        for (let i = col; i < col + successionForVictory; i++) {
            res += board[row - i + col] && board[row - i + col][i] === player;
        }
        return res === successionForVictory;
    }

    checkSuccessionCol = (board, row, col, player) => {
        const { successionForVictory } = this.state;

        let res = 0;
        for (let i = row; i < row + successionForVictory; i++) {
            res += board[i] && board[i][col] === player;
        }
        return res === successionForVictory;
    }

    checkSuccessionRow = (board, row, col, player) => {
        const { successionForVictory } = this.state;
        let res = 0;
        for (let i = col; i < col + successionForVictory; i++) {
            res += board[row] && board[row][i] === player;
        }
        return res === successionForVictory;
    }

    findFreeRow = (board, col) => {

        let { rows } = this.state;
        rows -= 1;
        while (board[rows][col] && rows > 0) {
            rows--
        };
        return rows;
    }

    togglePlayer = (currPlayer) => {
        if (currPlayer === 1) return 2;
        else if (currPlayer === 2) return 1;
    }

    render() {
        const { optsSubmitted, board, player1, player2, msg, currPlayer } = this.state;
        return (
            <section className="game-page">
                {
                    !optsSubmitted &&
                    <GameOpts onOptsSubmitted={this.handleOptsSubmit} />
                }

                {
                    optsSubmitted &&
                    <GamePanel
                        players={{ player1, player2 }}
                        msg={msg}
                        currPlayer={currPlayer}
                        onRestart={this.initBoard}
                    />
                }

                {
                    optsSubmitted &&
                    <GameBoard
                        board={board}
                        onCellClicked={this.handleCellClicked}
                        playerColors={{
                            player1Color: player1.color,
                            player2Color: player2.color
                        }} />
                }
            </section>
        )
    }
}
