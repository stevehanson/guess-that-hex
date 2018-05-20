import React, { Component } from 'react'
import globalStyle from './globalStyle'
import Button from './shared/button'
import Radium from 'radium'
import tinycolor from 'tinycolor2'

class GameGuessing extends Component {
  state = { guess: '', loadingDots: '...' }

  submit = (e) => {
    const { guess } = this.state
    e.preventDefault()
    if(!tinycolor(guess).isValid()) {
      alert('The color you entered is not valid. Please make sure it\'s a valid 3 or 6 character hex code or a CSS named color.')
      return
    }

    this.props.onSubmit(guess)
  }

  render() {
    const { hex, players, onReveal, creator } = this.props
    const { guess } = this.state
    const savedGuess = this.props.guess
    const donePlayers = players.filter(p => p.guess).map(p => p.name)
    const waitingOn = players.filter(p => !p.guess).map(p => p.name)

    return (
      <div style={styles.container}>
        <h2>Time to guess..</h2>
        <p>Enter your best guess. When you are finished, click "submit".</p>
        <div style={[styles.hex, { backgroundColor: hex }]} />

        <form style={styles.form} onSubmit={this.submit}>
          <div style={styles.formGroup}>
            <label style={globalStyle.label} htmlFor="hex">Hex</label>
            <input
              id="hex"
              style={[globalStyle.input, styles.input]}
              value={guess}
              onChange={e => this.setState({ guess: e.target.value })}
              placeholder="eg. #ff00ab"
            />
          </div>
          {!savedGuess && (
            <Button style={{ marginRight: '0.5em' }}>Submit</Button>
          )}
          {savedGuess && creator && (
            <Button type="button" onClick={onReveal}>Reveal</Button>
          )}

          <div style={styles.activityContainer}>
            {!!donePlayers.length && (
              <div style={styles.activity}>
                <i style={[styles.icon, styles.success]}>🌞</i>
                {donePlayers.join(', ')} have submitted their guesses!
              </div>
            )}
            {!!waitingOn.length && (
              <div style={styles.activity}>
                <i style={[styles.icon, styles.warn]}>🌝</i>
                Still waiting on&nbsp;
                {waitingOn.join(', ')}
              </div>
            )}
          </div>
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
  form: {
    marginTop: '2em'
  },
  formGroup: {
    marginBottom: '2em'
  },
  activityContainer: {
    margin: '2em 0'
  },
  activity: {
    color: '#888',
    marginBottom: '0.5em'
  }
}
export default Radium(GameGuessing)
