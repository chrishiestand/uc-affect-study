import * as types from '../constants/ActionTypes';

export function updateStateKey(oldstate, key, value) {
  return { type: types.UPDATE_STATE_KEY, oldstate, key, value };
}
