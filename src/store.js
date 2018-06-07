import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import gameReducers from './reducers/game'
import logger from 'redux-logger'

export const history = createHistory()
const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history),
  logger
]

if (process.env.NODE_ENV === 'development') {
  window.devToolsExtension && enhancers.push(window.devToolsExtension())
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const combinedReducers = combineReducers({
  game: gameReducers
})

const store = createStore(
    connectRouter(history)(combinedReducers),
    initialState,
    composedEnhancers
)

export default store
