import * as api from './api';

import { ActionType, createAction, createActionTypes, createReducer } from '../redux.utils';
import { Dispatch, combineReducers } from 'redux';

import { Activity } from './models';
import { AppState } from '../store';

const types = createActionTypes('activity', {
  IS_LOADING_SET: 'IS_LOADING_SET',
  IS_ADDING_SET: 'IS_ADDING_SET',

  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
});

export const setIsLoading = createAction(types.IS_LOADING_SET);
export const setIsAdding = createAction(types.IS_ADDING_SET);
export const setActivity = createAction(types.SET);
export const addActivity = createAction(types.ADD);
export const deleteActivity = createAction(types.DELETE);
export const updateActivity = createAction(types.UPDATE);

const isLoading = createReducer(false, {
  [types.IS_LOADING_SET]: (state, action) => action.payload,
});

const isAdding = createReducer(false, {
  [types.IS_ADDING_SET]: (state, action) => action.payload,
});

const activity = createReducer<Activity[]>([], {
  [types.ADD]: (state: Activity[], action: ActionType<Activity>) => [...state, { ...action.payload }],
  [types.DELETE]: (state: Activity[], action: ActionType<Activity>) => state.filter((m) => action.payload.id !== m.id),
  [types.SET]: (state: Activity[], action: ActionType<Activity[]>) => [...action.payload],
  [types.UPDATE]: (state: Activity[], action: ActionType<Activity>) =>
    state.map((a) => {
      if (a.id === action.payload?.id) {
        return action.payload;
      }
      return a;
    }),
});

export function dispatchLoadActivity() {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsLoading(true));

    const accessToken = getState().user.currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      const activity = await api.getActivity(accessToken);

      dispatch(setActivity(activity));
    } catch (e) {}

    dispatch(setIsLoading(false));
  };
}

export function dispatchAddActivity(activity: Activity) {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsAdding(true));

    const accessToken = getState().user.currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';
      const result = await api.postActivity(accessToken, activity);

      dispatch(addActivity(result));
    } catch (e) {}

    dispatch(setIsAdding(false));
  };
}

export const activityReducers = combineReducers({
  activity,
  isLoading,
  isAdding,
});
