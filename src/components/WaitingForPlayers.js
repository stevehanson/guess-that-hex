import React, { Component } from 'react'
import PropTypes from 'prop-types'
import globalStyle from '../globalStyle'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import copy from 'clipboard-copy'
import Radium from 'radium'
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

  renderTips() {
    const { classes } = this.props
    return (
      <div className={classes.tips}>
        <div className={classes.tipHeading}>
          <span role="img" aria-label="star" className={[classes.icon, classes.warn]}>⭐️</span>
          While you wait
        </div>
        <div>
          Remember that hex codes use the format #RRGGBB, with each color
          component in the range 00-FF. You can also use the shorthand #RGB
          format.
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
    )
  }

  render() {
    const { classes, gameId, players, creator, onStart } = this.props
    const { copied } = this.state
    const joinUrl = `${window.location.protocol}//${window.location.host}/join/${encodeURIComponent(gameId)}`

    return (
      <div className={classes.page}>
        <Grid className={classes.grid} container justify="center">
          <Grid item xs={12} className={classes.row}>
            <Paper className={classes.pageContainer}>
              <h2>Waiting for players...</h2>
              <Typography variant="body1" component="p" style={{ marginBottom: '1em' }}>
                The game creator will start the game once everyone has joined.
              </Typography>
              {creator && (
                <Button
                  onClick={onStart}
                  className={classes.startGame}
                  variant="contained"
                  color="secondary"
                >
                  Start the game!
                </Button>
              )}
              {creator && false && (
                <div>
                  <Typography variant="body1" component="p">
                    Other players can join by navigating here:
                  </Typography>
                  <div className={classes.gameId}>
                    <pre>{joinUrl}</pre>
                  </div>
                  <Button size="small" onClick={e => this.copyText(joinUrl)}>Copy Link</Button>
                  {copied && <span className={classes.copied}>copied!</span>}
                </div>
              )}
              {this.renderTips()}
              <ul className={classes.activity}>
                <li className={classes.loadingDots}>
                  <WaitingIndicator />
                </li>
                {[...players].reverse().map(player => (
                  <li key={player.id}>{player.name} joined the game!</li>
                ))}
              </ul>

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
  activity: {
    margin: '1em 0 2em -20px',
    fontSize: '1.2em',
    lineHeight: '1.7',
  },
  loadingDots: {
    listStyle: 'none',
  },
  gameIdContainer: {
    marginTop: '2em',
    textAlign: 'center',
  },
  copied: {
    marginLeft: '1em',
    fontSize: '0.9em'
  },
  startGame: {
    margin: '1em 0'
  },
  tips: {
    margin: '1em 0 0.5em',
    fontSize: '.9em',
    lineHeight: 1.4,
    borderRadius: '4px',
    padding: '1em',
    backgroundColor: '#fffcdf',
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

export default withStyles(styles)(Radium(WaitingForPlayers))
