import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { userReducer, appReducer, productReducer, groupReducer, basketReducer } from './reducers'

const reducer = combineReducers({
  user: userReducer,
  app: appReducer,
  product: productReducer,
  group: groupReducer,
  basket: basketReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
