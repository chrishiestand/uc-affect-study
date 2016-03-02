import * as types from '../constants/ActionTypes';

export function nextImage(oldstate, name, value) {
  return { type: types.NEW_IMAGE, oldstate, name, value };
}

export function nextImageQuestion(oldstate, end_ms) {
  return { type: types.NEW_IMAGE_QUESTION, oldstate, end_ms};
}

export function setImageStartMs(oldstate, start_ms) {
  return { type: types.SET_IMAGE_START_MS, oldstate, start_ms };
}

export function setImageAnswer(oldstate, name, value) {
  return { type: types.SET_IMAGE_ANSWER, oldstate, name, value };
}

export function disableImageAnswer(oldstate) {
  return { type: types.DISABLE_IMAGE_ANSWER, oldstate };
}

export function enableImageAnswer(oldstate) {
  return { type: types.ENABLE_IMAGE_ANSWER, oldstate };
}
