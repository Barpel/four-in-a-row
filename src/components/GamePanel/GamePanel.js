import React from 'react';
import './GamePanel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNinja, faRedo } from '@fortawesome/free-solid-svg-icons';

const GamePanel = ({ players, msg, currPlayer, onRestart }) => {
    return (
        <div className="game-panel">

            <h2 style={{ color: players.player1.color }}>
                {players.player1.name}
            </h2>

            <h2 style={{ color: players.player2.color }}>
                {players.player2.name}
            </h2>

            <button onClick={onRestart}>
                <FontAwesomeIcon icon={faRedo} />
            </button>

            <h3 style={{ color: players[`player${currPlayer}`].color }}>
                {players[`player${currPlayer}`].name}'s turn
                <br />
                <FontAwesomeIcon icon={faUserNinja} />
            </h3>
            {
                msg &&
                <h1>{msg}</h1>
            }
        </div >
    )
}

export default GamePanel;
