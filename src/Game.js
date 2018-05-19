import React, { Component } from 'react';
import GameControls from './GameControls';
import GameStatus from './GameStatus';
import logo from './logo.png';

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
        <div style={styles.nav}>
          <img src={logo} style={styles.logo} alt="guess that hex" />
        </div>
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
        <div className="color-container">
          <div className="color" style={{ backgroundColor: hex || '#fff' }}></div>
        </div>
      </div>
    )
  }
}

const styles = {
  nav: {
    width: '992px',
    maxWidth: '80%',
    margin: '0 auto 1em',
    borderBottom: '1px solid #eee'
  },
  logo: {
    width: '200px',
    height: '61px',
    margin: '0.75em 0 -1.4em'
  },
}

export default Game;
