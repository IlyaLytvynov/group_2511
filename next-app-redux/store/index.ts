// @ts-ignore
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import auth, { authMiddlewares, AuthState } from './auth';
import photos, { PhotosState } from './photos';
import userProfile, { UserProfileState } from './userProfile';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import ui, { UiState } from './ui';

export interface AppState {
  auth: AuthState;
  photos: PhotosState;
  userProfile: UserProfileState;
  ui: UiState;
}

const rootReducer = () =>
  combineReducers({
    auth,
    photos,
    userProfile,
    ui
  });

export default (initialState = {}) => {
  return createStore(
    rootReducer(),
    initialState,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware, ...(authMiddlewares as any))
    )
  );
};
