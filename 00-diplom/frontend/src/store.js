import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { userReducer, appReducer, productReducer } from './reducers'

const reducer = combineReducers({
  user: userReducer,
  app: appReducer,
  product: productReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
