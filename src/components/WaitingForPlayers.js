import React, { Component } from 'react'
import PropTypes from 'prop-types'
import globalStyle from '../globalStyle'
import copy from 'clipboard-copy'
import Radium from 'radium'
import Button from '../shared/button'
import WaitingIndicator from './WaitingIndicator'

class WaitingForPlayers extends Component {
  static propTypes = {
    gameId: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
    creator: PropTypes.bool.isRequired,
    onStart: PropTypes.func.isRequired
  }

  state = {}

  copyText = (text) => {
    copy(text)
    this.setState({ copied: true })
    setTimeout(() => { this.setState({ copied: false }) }, 2000)
  }

  render() {
    const { gameId, players, creator, onStart } = this.props
    const { copied } = this.state
    const joinUrl = `${window.location.protocol}//${window.location.host}/join/${encodeURIComponent(gameId)}`

    return (
      <div style={styles.container}>
        <h2>Waiting for players...</h2>
        {creator && (
          <div>
            <div style={styles.gamedIdText}>Other players can join by navigating here:</div>
            <div style={styles.gameId}>
              <pre>{joinUrl}</pre>
            </div>
            <button onClick={e => this.copyText(joinUrl)}>Copy</button>
            {copied && <span>copied!</span>}
          </div>
        )}
        <ul style={styles.activity}>
          {players.map(player => (
            <li key={player.id}>{player.name} joined the game!</li>
          ))}
          <li style={styles.loadingDots}>
            <WaitingIndicator />
          </li>
        </ul>

        {creator && (
          <Button onClick={onStart}>Start the game!</Button>
        )}
      </div>
    )
  }
}

const styles = {
  container: {
    width: '500px',
    maxWidth: '98%',
    margin: '0 auto',
    backgroundColor: globalStyle.colors.almostWhite,
    borderRadius: globalStyle.borderRadius,
    padding: globalStyle.padding.default,
    '@media (min-width: 500px)': {
      marginTop: '5em'
    }
  },
  activity: {
    margin: '2em 0',
    fontSize: '1.2em',
    lineHeight: '1.7'
  },
  loadingDots: {
    listStyleType: 'none',
  },
  gameIdContainer: {
    marginTop: '2em',
    textAlign: 'center',
  },
  gameIdText: {

  },
  gameId: {
  }
}

export default Radium(WaitingForPlayers)
