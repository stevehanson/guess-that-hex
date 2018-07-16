import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import GameGuessing from '../GameGuessing'
import GameResults from './GameResults'
import WaitingForPlayers from './WaitingForPlayers'
import globalStyle from '../globalStyle'
import logo from '../logo.png'

class Game extends Component {
  state = {}

  renderGameContent() {
    const {
      id,
      startGame,
      creator,
      started,
      revealed,
      hex,
      guess,
      players,
      submitGuess,
      revealAnswer 
    } = this.props

    if(!started) {
      return (
        <WaitingForPlayers
          gameId={id}
          players={players}
          creator={creator}
          onStart={startGame}
        />
      )
    } 

    if(guess && revealed) {
      return (
        <GameResults
          players={players}
          hex={hex}
        />
      )
    } else {
      return (
        <GameGuessing
          creator={creator}
          guess={guess}
          hex={hex}
          onReveal={revealAnswer}
          onSubmit={submitGuess}
          players={players}
        />
      )
    }

  }

  renderNav() {
    const { resetGame, revealed } = this.props

    return (
      <div style={styles.nav}>
        <div style={styles.navContainer}>
          <Link to="/">
            <img src={logo} style={styles.logo} alt="guess that hex" />
          </Link>
          <div style={styles.rightNav}>
            {revealed && (
              <a key="play-again" role="button" style={styles.rightNavLink} onClick={resetGame}>Play again</a>
            )}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderNav()}
        {this.renderGameContent()}
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
    height: globalStyle.navHeight,
    width: '992px',
    maxWidth: '80%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    width: '200px',
    height: '61px',
    margin: '0.75em 0 -1.4em',
    zIndex: '1',
    position: 'relative'
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
}

export default Game
