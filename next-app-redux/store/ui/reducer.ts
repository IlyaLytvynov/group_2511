import { ACTION_TYPES } from './types';

const INITIAL_STATE = {
  isServer: true
};

export interface UiState {
  isServer: boolean;
}

export default (state: UiState = INITIAL_STATE, { type, payload }: any) => {
  switch (type) {
    case ACTION_TYPES.SET_IS_SERVER:
      return { ...state, isServer: payload };
    default:
      return state;
  }
};
