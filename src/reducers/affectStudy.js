import Chance from 'chance';
import moment from 'moment';
import objectAssign from 'object-assign';

import * as actions from '../constants/ActionTypes';
import images from '../constants/Images';

let chance = new Chance();

const uniqueUid   = chance.integer({min: 1, max: 999999999999});
let random_images = chance.shuffle(images);

const initialState = {
    uniqueUid,
    userInfo: {age: null, gender: null, sexualOrientation: null, race: null},
    hasUserInfo: false,
    imagesRemaining: random_images,
    imageInfo: {start_ms: null, answer: null},
    imageNumber: 1,
    imageAnswerDisabled: true,
    qualitativeAnswers: [],
    toExport: [],
    complete: false
};

export default function affectStudyAppState(state = initialState, action) {

  switch (action.type) {

    case actions.SAVE_USER_INFO:
    {
      let newstate         = objectAssign({}, state);
      newstate.hasUserInfo = true;
      newstate.toExport.push({user_info: newstate.userInfo});
      return newstate;
    }

    case actions.UPDATE_USER_STATE:
    {
      let newstate = objectAssign({}, state);
      newstate.userInfo[action.name] = action.value;
      return newstate;
    }

    case actions.SAVE_IMAGE_INFO:
    {
      let newstate      = objectAssign({}, state);
      const ms_elapsed  = moment().valueOf() - state.imageInfo.start_ms;
      const answer      = state.imageInfo.answer;
      const imageNumber = state.imageNumber;
      let toExport      = {images: {ms_elapsed, answer, imageNumber}};
      newstate.toExport.push(toExport);

      newstate.imageAnswerDisabled = true;
      newstate.imagesRemaining.shift();
      newstate.imageInfo.answer = null;
      newstate.imageNumber++;
      return newstate;
    }

    case actions.UPDATE_IMAGE_STATE:
    {
      let newstate = objectAssign({}, state);
      newstate.imageInfo.answer = action.value;
      return newstate;
    }

    case actions.ENABLE_IMAGE_ANSWER:
    {
      let newstate = objectAssign({}, state);
      newstate.imageAnswerDisabled = false;
      return newstate;
    }

    case actions.DISABLE_IMAGE_ANSWER:
    {
      let newstate = objectAssign({}, state);
      newstate.imageAnswerDisabled = true;
      return newstate;
    }

    default:
      return state;
  }
}
