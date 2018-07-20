import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme'
import { StyleRoot } from 'radium';
import store, { history } from './store'
import Landing from './containers/Landing'
import Game from './containers/Game'

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <StyleRoot>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/join/:id" component={Landing} />
                <Route exact path="/new" component={Landing} />
                <Route path="/game/:id" component={Game} />
              </Switch>
            </ConnectedRouter>
          </StyleRoot>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default AppContainer
