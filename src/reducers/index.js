import { combineReducers } from 'redux';
import affectStudyAppState from './affectStudy';
// import fuelSavingsAppState from './fuelSavings';

const rootReducer = combineReducers({
  affectStudyAppState
});

export default rootReducer;
