import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import GamesIcon from '@material-ui/icons/Games';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import globalStyle from '../globalStyle'
import moment from 'moment'
import { pluralize } from '../util'

class Landing extends Component {
  static propTypes = {
    createGame: PropTypes.func.isRequired,
    joinGame: PropTypes.func.isRequired,
    games: PropTypes.array,
    loadingGames: PropTypes.bool
  }

  state = {
    gameId: '',
    name: localStorage.getItem('gth:name') || '',
    nameSet: false,
    games: [],
    loadingGames: true,
    manualJoin: false
  }

  componentDidMount() {
    const { gameId } = this.props
    this.setState({ gameId: gameId || '' })
    this.props.fetchLatestGames()
  }

  gameIdChanged = (e) => {
    this.setState({ gameId: e.target.value })
  }

  nameChanged = (e) => {
    const name = e.target.value
    this.setState({ name })
    localStorage.setItem('gth:name', name)
  }

  renderForm = () => {
    const { option, classes, createGame, joinGame, loadingGames } = this.props
    const { gameId, name, nameSet, manualJoin } = this.state
    const isNew = option === 'new'
    const isJoin = option === 'join'
    const buttonText = isNew ? 'Create Game' : (nameSet ? 'Join Game' : 'Next')
    const submit = (e) => {
      e.preventDefault()
      isNew ? createGame(name) : joinGame(gameId, name)
    }

    return (
      <form className={classes.form} onSubmit={submit}>
        <div style={{ marginBottom: '1em' }}>
          <Typography gutterBottom={true} align="center" variant="display1" className={classes.heading1}>
            {isNew ? 'Create Game' : 'Join Game'}
          </Typography>
          <Typography align="center" variant="body1" component="p">
            {isNew ? 'Enter your name below to create a game' : 'Select a game below' }
          </Typography>
        </div>

        {isNew && (
          <div className={classes.textField}>
            <TextField
              id="name"
              label="Your Name"
              className={classes.textField}
              margin="normal"
              value={name}
              helperText="Something to uniquely identify you"
              onChange={this.nameChanged}
              required
            />
          </div>
        )}

        {isJoin && (
          (gameId || manualJoin) ? (
            <div className={classes.textField}>
              <TextField
                id="name"
                label="Your Name"
                className={classes.textField}
                margin="normal"
                value={name}
                helperText="Something to uniquely identify you"
                onChange={this.nameChanged}
                required
              />
              {manualJoin && (
                <TextField
                  id="game-id"
                  label="Game ID"
                  className={classes.textField}
                  margin="normal"
                  value={gameId}
                  onChange={this.gameIdChanged}
                  required
                />
              )}
              <div className={classes.formActions}>
                <Button
                  type="submit"
                  style={styles.submit}
                  variant="contained"
                  color="secondary"
                >
                  Join game
                </Button>
                <Button
                  className={classes.back}
                  onClick={e => this.setState({ gameId: '', manualJoin: false })}
                  key="back"
                >
                  &laquo; Back
                </Button>
              </div>
            </div>
          ) : (
            <div className={classes.recentGames}>
              {loadingGames ? (
                <div className={classes.loadingContainer}>
                  <CircularProgress />
                </div>
              ) : this.renderGamesList()}
            </div>
          )
        )}

        <div className={classes.formActions}>
          {!isJoin && (
            <Button
              type="submit"
              style={styles.submit}
              variant="contained"
              color="secondary"
            >
              {buttonText}
            </Button>
          )}
        </div>
      </form>
    )
  }

  renderGamesList() {
    const { games, classes } = this.props
    try {
      return (
        <div>
          {!games || !games.length && (
            <Typography variant="body1" style={{ fontSize: '0.9rem', padding: '0 24px' }}>
              No recent games found. You can start a new one or join a game by ID.
            </Typography>
          )}
          <List>
            {(games || []).map((game, index) => {
              const numPlayers = game.players.length
              const started = moment(game.createdAt).from(moment())
              const numPlayersText = `🚶${pluralize(numPlayers, 'player')}  - ⏰${started}`
              const title = `${game.createdBy}’s game`

              return (
                <React.Fragment key={game.id}>
                  {/* <div className={classes.gameItem}> */}
                  {/*   <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
                  {/*     <Typography variant="body1" style={{ fontSize: '1.14rem' }}> */}
                  {/*       Bill’s Game */}
                  {/*     </Typography> */}
                  {/*     <Typography variant="body1" style={{ color: '#888' }}> */}
                  {/*       4 players */}
                  {/*     </Typography> */}
                  {/*   </div> */}
                  {/*   <div style={{ color: '#888', fontSize: '0.9rem' }}>⏰started 4 min ago</div> */}
                  {/* </div> */}
                  {/* <Divider /> */}
                  <ListItem
                    button
                    onClick={e => this.setState({ gameId: game.id })}
                  >
                  <ListItemText
                    primary={title}
                    secondary={numPlayersText} />
                  </ListItem>
                  {index < games.length && <Divider />}
                </React.Fragment>
              )
            })}
            <ListItem
              button
              onClick={e => this.setState({ manualJoin: true })}
            >
              <ListItemText
                primary="Join other game"
                secondary="Select to manually enter game ID" />
            </ListItem>
          </List>
        </div>
      )
    } catch(err) { console.error(err) }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.page}>
        <Grid className={classes.grid} container justify="center">
          <Grid item xs={12} className={classes.row}>
            <Paper elevation={2} className={classes.pageContainer}>
              {this.renderForm()}
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}


const styles = theme => ({
  row: {
    maxWidth: '550px'
  },
  page: {
    ...globalStyle.page
  },
  pageContainer: {
    marginTop: theme.spacing.unit * 2,
    padding: '16px',
    [theme.breakpoints.up(360)]: {
      padding: '32px',
      paddingTop: '16px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '50px',
      paddingTop: '32px',
    },
  },
  textField: {
    width: '100%',
    maxWidth: '350px'
  },
  formActions: {
    marginTop: '1.5em',
    width: '100%',
    maxWidth: '310px'
  },
  grid: {
    ...globalStyle.pageBg
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '0.2em'
  },
  input: {
    width: '100%',
  },
  back: {
    color: "#888",
    marginLeft: theme.spacing.unit,
  },
  submit: {
    marginTop: '1.5em'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2em 0 1em'
  },
  actionButton: {
    margin: '0 0.5em'
  },
  recentGames: {
    width: '100%',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  heading1: { ...globalStyle.heading1 },
  heading2: { ...globalStyle.heading2 },
  root: {
    flexGrow: 1,
  }
})

export default withStyles(styles)(Landing)
