import { combineReducers, createStore } from 'redux';
import docs from './reducers/docs';

const reducers = combineReducers({
  docs,
});

const store = createStore(reducers);

export default store;
