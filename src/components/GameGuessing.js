import React, { Component } from 'react'
import globalStyle from '../globalStyle'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Radium from 'radium'
import tinycolor from 'tinycolor2'
import { pluralize } from '../util'

class GameGuessing extends Component {
  state = { guess: '' }

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
    const { classes, hex, players, onReveal, creator } = this.props
    const { guess } = this.state
    const savedGuess = this.props.guess
    const donePlayers = players.filter(p => p.guess).map(p => p.name)
    const waitingOn = players.filter(p => !p.guess).map(p => p.name)
    const waitingOnDisplay = players.length > 12 ? pluralize(waitingOn.length, 'player') : waitingOn.join(', ')
    const donePlayersDisplay = players.length > 12 ? pluralize(donePlayers.length, 'player') : donePlayers.join(', ')

    return (
      <div className={classes.page}>
        <Grid className={classes.grid} container justify="center">
          <Grid item xs={12} className={classes.row}>
            <Paper className={classes.pageContainer}>
              <h2 style={styles.heading}>Time to guess..</h2>
              <p>Enter your best guess. When you are finished, click "submit".</p>
              <div
                className={classes.hex}
                style={{ backgroundColor: hex }}
              />

              <form style={styles.form} onSubmit={this.submit}>
                <div style={styles.formGroup}>
                  <TextField
                    label="Enter your guess"
                    className={classes.textField}
                    margin="normal"
                    value={guess}
                    helperText="Hex code, eg: #ff00aa, #f0a"
                    onChange={e => this.setState({ guess: e.target.value })}
                    style={{ width: '100%', marginBottom: '2em' }}
                    type="text"
                    required
                  />
                </div>
                {!savedGuess && (
                  <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    style={{ marginRight: '0.5em' }}
                  >
                    Submit
                  </Button>
                )}
                {savedGuess && creator && (
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '0.5em' }}
                    onClick={onReveal}
                  >
                    Reveal
                  </Button>
                )}

                <div className={classes.activityContainer}>
                  {!!donePlayers.length && (
                    <div className={classes.activity}>
                      <span role="img" aria-label="Sun with face" className={[classes.icon, classes.success]}>🌞</span>
                      {donePlayersDisplay} {donePlayers.length === 1 ? 'has' : 'have'} submitted their guess{donePlayers.length !== 1 && 'es'}!
                    </div>
                  )}
                  {!!waitingOn.length && (
                    <div className={classes.activity}>
                      <span role="img" aria-label="waiting moon" className={[classes.icon, classes.warn]}>🌝</span>
                      Still waiting on&nbsp;
                      {waitingOnDisplay}
                    </div>
                  )}
                </div>
              </form>
              <div className={classes.tips}>
                <div className={classes.tipHeading}>
                  <span role="img" aria-label="star" className={[classes.icon, classes.warn]}>⭐️</span>
                  Reminder
                </div>
                <div>
                  Hex codes use the format #RRGGBB (or #RGB), with each color represented
                  as a two-digit hex number ranging from 00-FF.
                </div>
                <div className={classes.tipsExample}>
                  Examples:&nbsp;
                  <span className="tipExampleColor" style={{ color: '#f00' }}>
                    #ff0000 (#f00)
                  </span>,&nbsp;
                  <span className="tipExampleColor" style={{ color: '#000' }}>
                    #000
                  </span>,&nbsp;
                  <span className="tipExampleColor" style={{ color: '#0a8' }}>
                    #0a8
                  </span>&nbsp;
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  page: {
    ...globalStyle.page
  },
  pageContainer: {
    marginTop: theme.spacing.unit * 2,
    padding: '32px',
    paddingTop: '16px',
    [theme.breakpoints.up('md')]: {
      padding: '50px',
      paddingTop: '32px',
    },
  },
  grid: {
    ...globalStyle.pageBg
  },
  row: {
    width: '100%',
    maxWidth: '550px'
  },
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
  heading: {
    marginTop: 0
  },
  activityContainer: {
    margin: '2em 0'
  },
  activity: {
    color: '#888',
    marginBottom: '0.5em'
  },
  tips: {
    color: '#888',
    marginBottom: '0.5em',
    fontSize: '.9em',
    lineHeight: 1.4,
    borderRadius: '4px',
    padding: '1em',
    backgroundColor: '#fffbd8',
  },
  tipHeading: {
    fontWeight: 600,
    fontSize: '1.05em',
    marginBottom: '1em'
  },
  tipsExample: {
    marginTop: '1em'
  },
  tipExampleColor: {
    display: 'inline-block',
    marginRight: '0.2em'
  }
})
export default withStyles(styles)(Radium(GameGuessing))
