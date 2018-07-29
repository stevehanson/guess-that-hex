import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import logo from '../logo.png';

const Page = ({ classes, children, resetGame, revealed }) => (
  <div className={classes.page}>
    <AppBar elevation={1} color="inherit" position="static">
      <Toolbar className={classes.nav}>
        {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"> */}
        {/*   <MenuIcon /> */}
        {/* </IconButton> */}

        <a href="/">
          <img src={logo} className={classes.logo} alt="guess that hex" />
        </a>
        {/* <Typography variant="title" color="inherit" className={`${classes.appTitle} ${classes.flex}`}> */}
        {/*   Guess that Hex */}
        {/* </Typography> */}
        {revealed && (
          <Button color="secondary" onClick={resetGame}>Play again</Button>
        )}
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
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

export default withStyles(styles)(Page)
