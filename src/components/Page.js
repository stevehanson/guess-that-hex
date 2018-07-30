import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import logo from '../logo.png';

const Page = ({ classes, children, resetGame, revealed }) => (
  <div className={classes.page}>
    <AppBar elevation={1} color="inherit" position="static">
      <Toolbar className={classes.nav}>
      <div>
        <a href="/">
          <img src={logo} className={classes.logo} alt="guess that hex" />
        </a>
      </div>

      <div>
        <Button
          id="new-game"
          className={classes.addButton}
          color="secondary"
          component={Link}
          to="/new"
        >
          <AddIcon className={classes.addButtonIcon} />
          <span className={classes.addButtonText}>New</span>
        </Button>
        {revealed && (
          <Button color="secondary" onClick={resetGame}>Play again</Button>
        )}
      </div>
      </Toolbar>
    </AppBar>
    {children}
  </div>
)

const styles = theme => ({
  appTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem'
    },
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    width: '190px',
    marginBottom: '-1.9em'
  },
  page: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  flex: {
    flexGrow: 1,
  },
  addButton: {
    padding: '8px 4px'
  },
  addButtonIcon: {
    marginRight: '3px'
  },
  addButtonText: {
    display: 'inline-block',
    marginTop: '1px'
  }
})

export default withStyles(styles)(Page)
