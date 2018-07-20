import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import logo from '../logo.png';

class Landing extends Component {
  static propTypes = {
    createGame: PropTypes.func.isRequired,
    joinGame: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()
    this.state = {
      option: '',
      gameId: '',
      name: localStorage.getItem('gth:name') || ''
    }
  }

  componentDidMount() {
    const { option, gameId } = this.props
    this.setState({ option, gameId })
  }

  gameIdChanged = (e) => {
    this.setState({ gameId: e.target.value })
  }

  nameChanged = (e) => {
    const name = e.target.value
    this.setState({ name })
    localStorage.setItem('gth:name', name)
  }

  renderOptions = () => {
    const { classes } = this.props

    return (
      <div className={classes.actions}>
        <Button
          variant="contained"
          color="secondary"
          id="new"
          key="new"
          className={classes.actionButton}
          onClick={() => this.setState({ option: 'new' })}
        >New Game</Button>
        <Button
          variant="contained"
          color="secondary"
          id="join"
          key="join"
          onClick={() => this.setState({ option: 'join' })}
        >Join Game</Button>
      </div>
    )
  }

  renderForm = () => {
    const { classes, createGame, joinGame } = this.props
    const { option, gameId, name } = this.state
    const buttonText = (option === 'new') ? 'Create Game' : 'Join Game'
    const submit = (e) => {
      e.preventDefault()
      option === 'new' ? createGame(name) : joinGame(gameId, name)
    }

    return (
      <form className={classes.form} onSubmit={submit}>
        <TextField
          label="Your Name"
          className={classes.textField}
          margin="normal"
          value={name}
          helperText="Something to uniquely identify you"
          onChange={this.nameChanged}
          required
        />
        {option === 'join' && (
          <TextField
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
            {buttonText}
          </Button>
          <Button
            className={classes.back}
            onClick={() => this.setState({ option: null })}
            key="back"
          >
            &laquo; Back
          </Button>
        </div>
      </form>
    )
  }

  render() {
    const { option } = this.state
    const { classes } = this.props

    return (
      <div className={classes.page}>
        <Grid className={classes.grid} container justify="center">
          <Grid item xs={12} className={classes.row}>
            <Paper className={classes.pageContainer}>
              <Typography gutterBottom={true} align="center" variant="headline" component="h3">
                Welcome, friend
              </Typography>
              <Typography align="center" variant="body1" component="p">
                Let's get started guessing some hexes!
              </Typography>
              {option ? this.renderForm() : this.renderOptions()}
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

//<img src={logo} style={styles.logo} alt="guess that hex" />

const styles = theme => ({
  row: {
    maxWidth: '550px'
  },
  page: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
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
    backgroundColor: '#f5f5f5',
    flex: 1,
    padding: '12px'
  },
  form: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    width: '300px',
    maxWidth: '90%',
    height: '92px',
    marginBottom: '-1.1em'
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
  root: {
    flexGrow: 1,
  }
})

export default withStyles(styles)(Landing)
