import React from 'react';
import './Cell.scss';

const Cell = ({ onCellClicked, col, color }) => {
    return (
        <td className="cell" onClick={() => onCellClicked(col)}>
            <div style={{ backgroundColor: color }} className={color === 'white' ? 'unmarked' : 'marked'}></div>
            <div className={color === 'white' ? 'empty-cell shown' : 'empty-cell transparent'}></div>
        </td>
    )
}

export default Cell;
