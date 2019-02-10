import React from 'react';

const PlayerOpts = ({ player, handleChange, disabled }) => {
    return (
        <label>
            <h2>Player {player.number}</h2>
            <input type="text"
                value={player.name}
                name="name"
                placeholder="Name"
                onChange={(ev) => handleChange(ev, player.number)}
                disabled={disabled}
            />

            <input type="color"
                name="color"
                value={player.color}
                onChange={(ev) => handleChange(ev, player.number)}
            />
        </label>
    )
}

export default PlayerOpts;
