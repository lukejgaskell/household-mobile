import * as api from './api';

import { createAction, createActionTypes, createReducer } from '../redux.utils';

import { combineReducers } from 'redux';

const types = createActionTypes('activity', {
  IS_LOADING_SET: 'IS_LOADING_SET',
  IS_ADDING_SET: 'IS_ADDING_SET',

  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE'
});

export const setIsLoading = createAction(types.IS_LOADING_SET);
export const setIsAdding = createAction(types.IS_ADDING_SET);
export const setActivity = createAction(types.SET);
export const addActivity = createAction(types.ADD);
export const deleteActivity = createAction(types.DELETE);
export const updateActivity = createAction(types.UPDATE);

const isLoading = createReducer(false, {
  [types.IS_LOADING_SET]: (state, action) => action.payload
});

const isAdding = createReducer(false, {
  [types.IS_ADDING_SET]: (state, action) => action.payload
});

const activity = createReducer([], {
  [types.ADD]: (state, action) => [...state, { ...action.payload }],
  [types.DELETE]: (state, action) =>
    state.filter((m) => action.payload !== m.id),
  [types.SET]: (state, action) => [...action.payload],
  [types.UPDATE]: (state, action) =>
    state.map((a) => {
      if (a.id === action.payload?.id) {
        return action.payload;
      }
      return a;
    })
});

export function loadActivity() {
  return async function(dispatch, getState) {
    dispatch(setIsLoading(true));

    const accessToken = getState().currentUser?.accessToken;

    try {
      const response = await api.getActivity(accessToken);

      const result = await response.json();

      dispatch(setActivity(result));
    } catch (e) {}

    dispatch(setIsLoading(false));
  };
}

export function createActivity(activity) {
  return async function(dispatch, getState) {
    dispatch(setIsAdding(true));

    const accessToken = getState().currentUser?.accessToken;

    try {
      const response = await api.postActivity(accessToken, activity);

      const result = await response.json();

      dispatch(addActivity(result));
    } catch (e) {}

    dispatch(setIsAdding(false));
  };
}

export const activityReducers = combineReducers({
  activity,
  isLoading,
  isAdding
});
