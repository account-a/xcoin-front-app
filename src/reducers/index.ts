import { combineReducers } from 'redux';

import { rate } from './rate';

const reducers = {
  rate,
};

export default combineReducers(reducers);