import * as types from '../constants/ActionTypes';

export function saveImageInfo(oldstate, name, value) {
  return { type: types.SAVE_IMAGE_INFO, oldstate, name, value };
}

export function updateImageState(oldstate, name, value) {
  return { type: types.UPDATE_IMAGE_STATE, oldstate, name, value };
}

export function disableImageAnswer(oldstate) {
  return { type: types.DISABLE_IMAGE_ANSWER, oldstate };
}

export function enableImageAnswer(oldstate) {
  return { type: types.ENABLE_IMAGE_ANSWER, oldstate };
}
