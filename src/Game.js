import React, { Component } from 'react'
import tinycolor from 'tinycolor2'
import Radium from 'radium'
import GameGuessing from './GameGuessing'
import WaitingForPlayers from './WaitingForPlayers'
import ResultBox from './ResultBox'
import globalStyle from './globalStyle'
import logo from './logo.png'

class Game extends Component {
  constructor() {
    super()
    this.state = {}
  }

  renderGameContent() {
    const { creator, revealed, hex, guess, players, onSubmit,
      onReveal } = this.props

    if(guess && revealed) {
      return this.renderReveal()
    } else {
      return (
        <GameGuessing
          creator={creator}
          guess={guess}
          hex={hex}
          onReveal={onReveal}
          onSubmit={onSubmit}
          players={players}
        />
      )
    }
  }

  renderReveal() {
    const { hex, players } = this.props
    const colorStyle = {
      ...styles.color,
      color: tinycolor.mostReadable(hex, ['#444', '#fff']).toHexString(),
      backgroundColor: hex
    }
    
    return (
      <div>
        <div style={styles.boxes}>
          {players && players.map(player => (
            <ResultBox
              key={player.id}
              player={player}
            />
          ))}
        </div>
        <div style={styles.colorContainer}>
          <div style={colorStyle}>{hex}</div>
        </div>
      </div>
    )
  }

  render() {
    const { id, creator, started, players, revealed, onReset, onStart } = this.props

    return (
      <div>
        <div style={styles.nav}>
          <div style={styles.navContainer}>
            <img src={logo} style={styles.logo} alt="guess that hex" />
            <div style={styles.rightNav}>
              {revealed && (
                <a key="play-again" role="button" style={styles.rightNavLink} onClick={onReset}>Play again</a>
              )}
            </div>
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
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    width: '200px',
    height: '61px',
    margin: '0.75em 0 -1.4em',
    zIndex: '1'
  },
  rightNavLink: {
    marginTop: '1em',
    display: 'inline-block',
    color: '#555',
    cursor: 'pointer',
    ':hover': {
      color: globalStyle.colors.primary,
      transition: 'all 200ms'
    }
  },
  boxes: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto',
    height: 'calc(100vh - 52px)'
  },
  colorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none'
  },
  color: {
    width: '20%',
    height: '30vh',
    background: 'red',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    fontSize: '0.8em',
    '@media (min-width: 500px)': {
      fontSize: '1em'
    },
    '@media (min-width: 700px)': {
      fontSize: '1.3em'
    }
  }
}

export default Radium(Game);
