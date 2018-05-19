import React, { Component } from 'react';
import GameControls from './GameControls';
import GameStatus from './GameStatus';

class Box extends Component {
  render() {
    const { name, hex } = this.props
    return (
      <div className="box">
        <input style={styles.input} placeholder="#hex" />
        {name}
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
    const { id, hex, creator, started, revealed, players, onStart, onReveal, onPlayerHexChanged } = this.props

    return (
      <div>
        {creator ? (
          <GameControls
            id={id}
            started={started}
            revealed={revealed}
            onStart={onStart}
            onReveal={onReveal}
          />
        ) : (
          <GameStatus
            started={started}
            revealed={revealed}
          />
        )}
        <div className="boxes">
          {players && Object.entries(players).map(player => (
            <Box
              name={player[1].name}
              hex={player[1].hex}
              onHexChanged={hex => onPlayerHexChanged(player[0], hex)}
            />
          ))}
        </div>
        <div class="color-container">
          <div class="color" style={{ backgroundColor: hex || '#fff' }}></div>
        </div>
      </div>
    )
  }
}

const styles = {
}

export default Game;
