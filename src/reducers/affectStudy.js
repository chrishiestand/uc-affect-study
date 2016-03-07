import Chance from 'chance';
import moment from 'moment';
import objectAssign from 'object-assign';
import lodash from 'lodash';

import * as actions from '../constants/ActionTypes';
import images from '../constants/Images';
import * as FBC from '../constants/Firebase';
import * as BL from '../businessLogic/export';

let chance = new Chance();

const uniqueUid   = chance.integer({min: 1, max: 999999999999});
let random_images = chance.shuffle(images);
let rootref       = BL.makeBaseRef(FBC.FIREBASE_HOST);

const initialState = {
    uniqueUid,
    userInfo: {age: null, gender: null, sexual_orientation: null, race: null},
    hasUserInfo: false,
    imagesRemaining: random_images,
    imageInfo: {start_ms: null, end_ms: null, answer: null},
    imageFreeze: null,
    imageTimeout: null,
    sequenceNumber: 1,
    imageAnswerDisabled: true,
    emotion: null,
    qual1: null,
    qual2: null,
    exportRef: rootref,
    userInfoExport: {},
    userImageExport: {},
    complete: false
};

export default function affectStudyAppState(state = initialState, action) {

  switch (action.type) {

    case actions.SAVE_USER_INFO:
    {
      let newstate            = objectAssign({}, state);
      newstate.hasUserInfo    = true;
      newstate.userInfoExport = newstate.userInfo;
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

      if (newstate.imageTimeout) {
        clearTimeout(newstate.imageTimeout);
        newstate.imageTimeout = null;
      }

      return newstate;
    }

    case actions.NEW_IMAGE:
    {
      let newstate      = objectAssign({}, state);

      const start_ms        = newstate.imageInfo.start_ms;
      const end_ms          = newstate.imageInfo.end_ms;
      const answer          = newstate.imageInfo.answer;
      const sequence_number = newstate.sequenceNumber;
      const image_number    = newstate.imagesRemaining[0][0];
      let exportItem        = {start_ms, end_ms, answer, sequence_number, image_number};


      newstate.userImageExport[image_number] = exportItem;

      newstate.imageAnswerDisabled    = true;
      newstate.imageInfo.answer       = null;
      newstate.imageInfo.start_ms     = null;
      newstate.imageInfo.end_ms       = null;
      newstate.imagesRemaining.shift();
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
      newstate.imageFreeze = null;
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

      const {emotion, qual1, qual2} = state;

      const complete   = true;
      const exportItem = {qual1, qual2, emotion, complete};

      newstate.userInfo = objectAssign(newstate.userInfo, exportItem);
      newstate.complete = true;
      return newstate;
    }

    case actions.EXPORT_COMPLETE:
    {
      const userInfo  = action.userInfo;
      const imageInfo = action.imageInfo;

      let newstate = objectAssign({}, state);

      lodash.map(userInfo, (val, key) => {
        delete newstate.userInfoExport[key];
      });

      lodash.map(imageInfo, (val, key) => {
        delete newstate.userImageExport[key];
      });

      return newstate;
    }

    default:
      return objectAssign({}, state);
  }
}
