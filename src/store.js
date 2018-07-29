import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import gameReducers from './reducers/game'

export const history = createHistory()
const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middleware.push(logger);
}

if (process.env.NODE_ENV === 'development') {
  window.devToolsExtension && enhancers.push(window.devToolsExtension())
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const rootReducer = combineReducers({
  game: gameReducers
})

const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composedEnhancers
)

export default store
