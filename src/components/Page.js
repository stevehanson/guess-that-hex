import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import logo from '../logo.png';

const Page = ({ classes, children, resetGame, revealed }) => (
  <div className={classes.page}>
    <AppBar color="primary" position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={[classes.appTitle, classes.flex]}>
          Guess that Hex
        </Typography>
        {revealed && (
          <Button color="inherit" onClick={resetGame}>Play again</Button>
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
