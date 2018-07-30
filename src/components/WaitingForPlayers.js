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
              {creator && (
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
              <ul className={classes.activity}>
                {players.map(player => (
                  <li key={player.id}>{player.name} joined the game!</li>
                ))}
                <li className={classes.loadingDots}>
                  <WaitingIndicator />
                </li>
              </ul>

              {creator && (
                <Button
                  onClick={onStart}
                  variant="contained"
                  color="secondary"
                >
                  Start the game!
                </Button>
              )}
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
    margin: '2em 0 2em -20px',
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
  }
})

export default withStyles(styles)(Radium(WaitingForPlayers))
