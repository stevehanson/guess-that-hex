import React, { Component } from 'react'
import globalStyle from './globalStyle'
import Button from './shared/button'
import Radium from 'radium'

class GameGuessing extends Component {
  state = { guess: '', loadingDots: '...' }


  render() {
    const { hex, players, onSubmit } = this.props
    const { loadingDots, guess } = this.state

    return (
      <div style={styles.container}>
        <h2>Time to guess..</h2>
        <p>Enter your best guess. When you are finished, click "submit".</p>
        <div style={[styles.hex, { backgroundColor: hex }]} />

        <form style={styles.form} onSubmit={() => onSubmit(guess)}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">Your Name</label>
            <input className="input" style={styles.input} value={guess} onChange={e => this.setState({ guess: e.target.value })} />
          </div>
          <ul style={styles.activity}>
            {players.map(player => (
              <li key={player.name}>{player.name} joined the game!</li>
            ))}
            <li style={styles.loadingDots}>{loadingDots}</li>
          </ul>

          <Button>Submit</Button>
        </form>
      </div>
    )
  }
}

const styles = {
  container: {
    width: '500px',
    maxWidth: '98%',
    margin: '5em auto 0',
    backgroundColor: globalStyle.colors.almostWhite,
    borderRadius: globalStyle.borderRadius,
    padding: globalStyle.padding.default,
  },
  hex: {
    width: '300px',
    paddingBottom: '40%',
    margin: '2em auto 0',
    borderRadius: globalStyle.borderRadius,
    maxWidth: '100%'
  },
  activity: {
    margin: '2em 0',
    fontSize: '1.2em',
    lineHeight: '1.7'
  },
  loadingDots: {
    fontFamily: 'georgia, serif',
    fontSize: '1.4em',
    fontWeight: 900,
    height: '35px',
    color: globalStyle.colors.primary,
    listStyleType: 'none',
    marginTop: '0.5em'
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
export default Radium(GameGuessing)
