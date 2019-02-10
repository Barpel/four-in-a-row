import React from 'react';
import Cell from '../Cell';

const Row = ({ row, onCellClicked, playerColors }) => {

    return (
        <tr >
            {row.map((cell, idx) => <Cell key={idx} onCellClicked={onCellClicked} col={idx} color={cell ? playerColors[`player${cell}Color`] : 'white'} />)}
        </tr>
    )
}

export default Row;
