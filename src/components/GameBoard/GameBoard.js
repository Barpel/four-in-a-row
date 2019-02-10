import React from 'react';
import Row from '../Row/Row';
import './GameBoard.scss';

const GameBoard = ({ board, onCellClicked, playerColors }) => {
    return (
        <table className="game-board">
            <tbody>
                {board.map((row, idx) =>
                    <Row key={idx}
                        row={row}
                        onCellClicked={onCellClicked}
                        playerColors={playerColors}
                    />)}
            </tbody>
        </table>
    )
}

export default GameBoard
