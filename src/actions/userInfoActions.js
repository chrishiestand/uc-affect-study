import * as types from '../constants/ActionTypes';

export function saveUserInfo(oldstate) {
  return { type: types.SAVE_USER_INFO, oldstate };
}

export function updateUserState(oldstate, name, value) {
  return { type: types.UPDATE_USER_STATE, oldstate, name, value };
}
