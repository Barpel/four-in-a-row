import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faLaptop } from '@fortawesome/free-solid-svg-icons';
import './GameOpts.scss';
import PlayerOpts from '../PlayerOpts/PlayerOpts';

export class GameOpts extends Component {
    state = {
        modeSelected: false,
        optsSubmitted: false,
        pcMode: true,
        player1: { number: 1, name: '', color: '#38adb3' },
        player2: { number: 2, name: 'Computer', color: '#d84726' },
    }

    handleChange = (ev, playerNum) => {
        let player = playerNum === 1 ? 'player1' : 'player2';
        this.setState({
            ...this.state,
            [player]: {
                ...this.state[player],
                [ev.target.name]: ev.target.value
            }
        });
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        if (!this.state.player1.name || !this.state.player2.name || (!this.state.pcMode && this.state.player2.name === 'Computer')) alert('Please enter valid player names');
        else {
            this.setState({ ...this.state, optsSubmitted: true });
            let stateToEmit = {
                pcMode: this.state.pcMode,
                player1: this.state.player1,
                player2: this.state.player2,
                optsSubmitted: true
            };
            this.props.onOptsSubmitted(stateToEmit);
        }
    }
    render() {
        const { modeSelected, player1, player2, pcMode, optsSubmitted } = this.state;
        return (
            <div className="game-opts-container">

                {
                    !modeSelected &&
                    <div className="game-mode-container">
                        <button className="player-vs-player-btn"
                            onClick={() => this.setState({ ...this.state, pcMode: false, modeSelected: true })}>
                            <FontAwesomeIcon icon={faUserFriends} />
                        </button>
                        <h2>2 Players</h2>

                        <button className="player-vs-player-btn"
                            onClick={() => this.setState({ ...this.state, pcMode: true, modeSelected: true })}>
                            <FontAwesomeIcon icon={faLaptop} />
                        </button>
                        <h2>Computer</h2>
                    </div>
                }

                {
                    modeSelected && !optsSubmitted &&
                    <form className="game-opts" onSubmit={this.handleSubmit}>

                        <PlayerOpts player={player1} handleChange={this.handleChange} />
                        <PlayerOpts player={player2} handleChange={this.handleChange}
                            disabled={pcMode} />


                        <button type="submit">Save</button>
                    </form>
                }
            </div>
        )
    }
}

export default GameOpts;
