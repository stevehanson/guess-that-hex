import React, { Component } from 'react';
import GameGuessing from './GameGuessing'
import WaitingForPlayers from './WaitingForPlayers'
import logo from './logo.png';

class Box extends Component {
  render() {
    const { name } = this.props
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

  renderGameContent() {
    const { started, revealed, hex, players, onSubmit } = this.props

    if(started && !revealed) {
      return (
        <GameGuessing
          hex={hex}
          onSubmit={onSubmit}
          players={players}
        />
      )
    } else if(started) {
      return this.renderReveal()
    }
  }

  renderInput() {
    return (
      <div>Input your guess</div>
    )
  }

  renderReveal() {
    const { hex, players } = this.props
    
    return (
      <div>
        <div className="boxes">
          {players && players.map(player => (
            <Box
              key={player.id}
              name={player.name}
              hex={player.hex}
            />
          ))}
        </div>
        <div className="color-container">
          <div className="color" style={{ backgroundColor: hex || '#fff' }}></div>
        </div>
      </div>
    )
  }

  render() {
    const { id, creator, started, players, onStart, } = this.props

    return (
      <div>
        <div style={styles.nav}>
          <div style={styles.navContainer}>
            <img src={logo} style={styles.logo} alt="guess that hex" />
          </div>
        </div>

        {started ? this.renderGameContent() : (
          <WaitingForPlayers
            gameId={id}
            players={players}
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
