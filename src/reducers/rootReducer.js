import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  data: notesReducer,
});

export default rootReducer;
