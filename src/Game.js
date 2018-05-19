import React, { Component } from 'react';
import GameControls from './GameControls';
import GameStatus from './GameStatus';

class Box extends Component {
  render() {
    return (
      <div className="box">
        <input placeholder="#hex" />
      </div>
    )
  }
}


class Game extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { creator, started, revealed, onStart, onReveal } = this.props

    return (
      <div>
        {creator ? (
          <GameControls
            started={started}
            revealed={revealed}
            onStart={onStart}
            onReveal={onReveal}
          />
        ) : (
          <GameStatus />
        )}
        <div className="boxes">
          <Box />
          <Box />
          <Box />
          <Box />
        </div>
      </div>
    )
  }
}

export default Game;
