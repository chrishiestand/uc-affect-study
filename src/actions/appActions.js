import * as types from '../constants/ActionTypes';

export function nextImage(oldstate) {
  return { type: types.NEW_IMAGE, oldstate };
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

export function updateStateKey(oldstate, key, value) {
  return { type: types.UPDATE_STATE_KEY, oldstate, key, value };
}

export function saveUserInfo(oldstate) {
  return { type: types.SAVE_USER_INFO, oldstate };
}

export function updateUserState(oldstate, name, value) {
  return { type: types.UPDATE_USER_STATE, oldstate, name, value };
}

export function drainImageQueue(oldstate) {
  return { type: types.IMAGE_DRAIN_QUEUE, oldstate };
}

export function markComplete(oldstate) {
  return { type: types.COMPLETE, oldstate };
}

export function unsetExports(oldstate, userInfo, imageInfo) {
  return { type: types.EXPORT_COMPLETE, oldstate, userInfo, imageInfo };
}

export function authExport(oldstate) {
  return { type: types.EXPORT_AUTH, oldstate };
}
