import React, { Component } from 'react';
import GameControls from './GameControls';
import GameStatus from './GameStatus';
import WaitingForPlayers from './WaitingForPlayers'
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
    const { id, hex, creator, started, revealed, players, onStart, onReveal,
      onPlayerHexChanged } = this.props
    const playerNames = Object.values(players)

    return (
      <div>
        <div style={styles.nav}>
          <div style={styles.navContainer}>
            <img src={logo} style={styles.logo} alt="guess that hex" />
          </div>
        </div>
        {creator ? (
          null
        ) : (
          <GameStatus
            started={started}
            revealed={revealed}
          />
        )}
        {started ? (
          <div>
            <div className="boxes">
              {players && Object.entries(players).map(player => (
                <Box
                  key={player[0]}
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
        ) : (
          <WaitingForPlayers
            gameId={id}
            players={playerNames}
            creator={creator}
            onStart={onStart}
          />
        )}
      </div>
    )
  }
}

const styles = {
  nav: {
    borderBottom: '1px solid #eee',
  },
  navContainer: {
    margin: '0 auto',
    width: '992px',
    maxWidth: '80%',
  },
  logo: {
    width: '200px',
    height: '61px',
    margin: '0.75em 0 -1.4em'
  },
}

export default Game;
