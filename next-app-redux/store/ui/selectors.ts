import { AppState } from '../index';

export const getIsServer = (state: AppState) => state.ui!.isServer;
