import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
//import { postReducer, postsReducer, userReducer, usersReducer, appReducer } from './reducers';
import { thunk } from 'redux-thunk';
import { userReducer, appReducer } from './reducers';

const reducer = combineReducers({
  user: userReducer,
  app: appReducer,
  // user: userReducer,
  // users: usersReducer,
  // post: postReducer,
  // posts: postsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
