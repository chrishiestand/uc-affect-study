import * as actions from '../constants/ActionTypes';
// import calculator from '../businessLogic/fuelSavingsCalculator';
import dateHelper from '../businessLogic/dateHelper';
import objectAssign from 'object-assign';

const initialState = {
    userInfo: {age: null, gender: null, sexualOrientation: null, race: null, uniqueUid: null},
    hasUserInfo: false,
    imagesRemaining: [],
    imageInfo: {start_ms: null},
    toExport: {},
    complete: false
};

export default function affectStudyAppState(state = initialState, action) {
  console.log('action');
  console.log(action);

  switch (action.type) {

    case actions.SAVE_USER_INFO:
    {
      //TODO
      return state;
    }

    case actions.UPDATE_USER_STATE:
    {
      let newstate = objectAssign({}, state);
      newstate.userInfo[action.name] = action.value;
      return newstate;
    }

    default:
      return state;
  }
}
