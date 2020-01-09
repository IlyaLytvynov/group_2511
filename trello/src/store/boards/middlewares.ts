import { subscribe } from '../../utils';
import { ACTION_TYPES } from './types';
import { Worker } from '../../utils';
import { Action } from '../types';
import { request } from '../http';
import { setBoards } from './actions';

const fetchBoardsWorker: any = ({
  action,
  next,
  dispatch
}: {
  action: any;
  next: any;
  dispatch: any;
}) => {
  next(action);
};

const fetchMiddleware = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.FETCH, fetchBoardsWorker)(next, dispatch);

export const boardsMiddleware = [fetchMiddleware];
