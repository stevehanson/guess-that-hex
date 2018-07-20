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
import Page from './containers/Page'

const AppContainer = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <StyleRoot>
        <ConnectedRouter history={history}>
          <Route path="/" component={App} />
        </ConnectedRouter>
      </StyleRoot>
    </MuiThemeProvider>
  </Provider>
)

const App = () => (
  <Page>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/join/:id" component={Landing} />
      <Route exact path="/new" component={Landing} />
      <Route path="/game/:id" component={Game} />
    </Switch>
  </Page>
)

export default AppContainer
