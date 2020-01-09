import { ACTION_TYPES } from './types';
import { Middleware } from 'redux';

const asyncTimeout = async (fn: any, ms: number = 1000) => {
  setTimeout(() => {
    Promise.resolve(fn());
  }, ms);
};

export const asyncIncrease: Middleware = () => (next: any) => {
  return async (action: any) => {
    if (action.type === ACTION_TYPES.INCREASE_COUNT) {
      await asyncTimeout(() => {
        next(action);
      }, 2000);
    } else {
      next(action);
    }
  };
};
