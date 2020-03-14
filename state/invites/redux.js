import * as api from './api';

import { createAction, createActionTypes, createReducer } from '../redux.utils';

import { combineReducers } from 'redux';

const types = createActionTypes('invites', {
  IS_LOADING_SET: 'IS_LOADING_SET',
  IS_UPDATING_SET: 'IS_UPDATING_SET',

  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE'
});

export const setIsLoadingInvites = createAction(types.IS_LOADING_SET);
export const setIsUpdatingInvites = createAction(types.IS_UPDATING_SET);

export const setInvites = createAction(types.SET);
export const addInvites = createAction(types.ADD);
export const deleteInvites = createAction(types.DELETE);
export const updateInvites = createAction(types.UPDATE);

const isLoading = createReducer(false, {
  [types.IS_LOADING_SET]: (state, action) => action.payload
});

const isUpdating = createReducer(false, {
  [types.IS_UPDATING_SET]: (state, action) => action.payload
});

const invites = createReducer([], {
  [types.ADD]: (state, action) => [...state, { ...action.payload }],
  [types.DELETE]: (state, action) =>
    state.filter((m) => action.payload !== m.id),
  [types.SET]: (state, action) => [...action.payload],
  [types.UPDATE]: (state, action) =>
    state.map((m) => {
      if (m.id === action.payload?.id) {
        return action.payload;
      }
      return m;
    })
});

export function dispatchLoadInvites() {
  return async function(dispatch, getState) {
    dispatch(setIsLoadingInvites(true));

    const accessToken = getState().currentUser?.accessToken;

    try {
      const response = await api.getInvites(accessToken);

      const result = await response.json();

      dispatch(setInvites(result || []));
    } catch (e) {}

    dispatch(setIsLoadingInvites(false));
  };
}

export function dispatchAddInvite(invite) {
  return async function(dispatch, getState) {
    dispatch(setIsUpdatingInvites(true));

    const currentUser = getState().currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      const response = await api.postInvite(accessToken, invite);
      const result = await response.json();

      dispatch(addInvites(result));
    } catch (e) {}

    dispatch(setIsUpdatingInvites(false));
  };
}

export function dispatchDeleteInvite(memberId) {
  return async function(dispatch, getState) {
    dispatch(setIsUpdatingInvites(true));

    const currentUser = getState().currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      const response = await api.deleteInvite(accessToken, memberId);
      const result = await response.json();

      dispatch(deleteInvites(result));
    } catch (e) {}

    dispatch(setIsUpdatingInvites(false));
  };
}

export const invitesReducers = combineReducers({
  invites,
  isLoading,
  isUpdating
});
