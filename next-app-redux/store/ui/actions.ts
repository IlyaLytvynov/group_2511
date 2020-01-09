import { ACTION_TYPES } from './types';

export const setIsServer = (isServer: boolean) => dispatch =>
  dispatch({ type: ACTION_TYPES, payload: isServer });
