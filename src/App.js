import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { StyleRoot } from 'radium';
import store, { history } from './store'
import App from './App'
import Landing from './Landing'
import Game from './Game'

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    )
  }
}

export default AppContainer
