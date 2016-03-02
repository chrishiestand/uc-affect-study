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
    imageInfo: {start_ms: null, end_ms: null, answer: null},
    sequenceNumber: 1,
    imageAnswerDisabled: true,
    qualitativeAnswers: [],
    emotion: null,
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

    case actions.UPDATE_STATE_KEY:
    {
      let newstate = objectAssign({}, state);
      newstate[action.key] = action.value;
      return newstate;
    }

    case actions.NEW_IMAGE_QUESTION:
    {
      let newstate = objectAssign({}, state);

      newstate.imageInfo.end_ms = action.end_ms;

      return newstate;
    }

    case actions.NEW_IMAGE:
    {
      const start_ms                 = state.imageInfo.start_ms;
      const end_ms                   = state.imageInfo.end_ms;
      const answer                   = state.imageInfo.answer;
      const sequenceNumber           = state.sequenceNumber;
      const imageNumber              = state.imagesRemaining[0][0];
      let exportItem                 = {images: {}};
      exportItem.images[imageNumber] = {start_ms, end_ms, answer, sequenceNumber};

      let newstate      = objectAssign({}, state);
      newstate.toExport.push(exportItem);

      newstate.imageAnswerDisabled = true;
      newstate.imagesRemaining.shift();
      newstate.imageInfo.answer   = null;
      newstate.imageInfo.start_ms = null;
      newstate.imageInfo.end_ms   = null;
      newstate.sequenceNumber++;
      return newstate;
    }

    case actions.SET_IMAGE_ANSWER:
    {
      let newstate = objectAssign({}, state);
      newstate.imageInfo.answer = action.value;
      return newstate;
    }

    case actions.SET_IMAGE_START_MS:
    {
      let newstate = objectAssign({}, state);
      newstate.imageInfo.start_ms = action.start_ms;
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

    case actions.IMAGE_DRAIN_QUEUE:
    {
      let newstate = objectAssign({}, state);
      newstate.imagesRemaining = [];
      return newstate;
    }

    case actions.COMPLETE:
    {
      let newstate = objectAssign({}, state);
      newstate.complete = true;
      return newstate;
    }

    default:
      return state;
  }
}
