import React, { Component } from 'react'
import globalStyle from './globalStyle'
import Button from './shared/button'
import Radium from 'radium'

class GameGuessing extends Component {
  state = { guess: '', loadingDots: '...' }

  submit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.guess)
  }

  render() {
    const { hex, players, onSubmit, onReveal, creator } = this.props
    const { loadingDots, guess } = this.state
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
          <Button>Submit</Button>
          {creator && (
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
  activityContainer: {
    margin: '2em 0'
  },
  activity: {
    color: '#888',
    marginBottom: '0.5em'
  }
}
export default Radium(GameGuessing)
