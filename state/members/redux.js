import * as api from './api';

import { createAction, createActionTypes, createReducer } from '../redux.utils';

import { combineReducers } from 'redux';

const types = createActionTypes('members', {
  IS_LOADING_SET: 'IS_LOADING_SET',
  IS_UPDATING_SET: 'IS_UPDATING_SET',

  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE'
});

export const setIsLoadingMembers = createAction(types.IS_LOADING_SET);
export const setIsUpdatingMembers = createAction(types.IS_UPDATING_SET);

export const setMembers = createAction(types.SET);
export const addMember = createAction(types.ADD);
export const deleteMember = createAction(types.DELETE);
export const updateMembers = createAction(types.UPDATE);

const isLoading = createReducer(false, {
  [types.IS_LOADING_SET]: (state, action) => action.payload
});

const isUpdating = createReducer(false, {
  [types.IS_UPDATING_SET]: (state, action) => action.payload
});

const members = createReducer([], {
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

export function dispatchLoadMembers() {
  return async function(dispatch, getState) {
    dispatch(setIsLoadingMembers(true));

    const accessToken = getState().currentUser?.accessToken;

    try {
      const membersResponse = await api.getMembers(accessToken);

      const resp = await membersResponse.json();

      dispatch(setMembers(resp || []));
    } catch (e) {}

    dispatch(setIsLoadingMembers(false));
  };
}

export function dispatchAddMember(members) {
  return async function(dispatch, getState) {
    dispatch(setIsUpdatingMembers(true));

    const currentUser = getState().currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      const membersResponse = await api.postMember(accessToken, members);
      const resp = await membersResponse.json();

      dispatch(addMember(resp));
    } catch (e) {}

    dispatch(setIsUpdatingMembers(false));
  };
}

export function dispatchDeleteMember(memberId) {
  return async function(dispatch, getState) {
    dispatch(setIsUpdatingMembers(true));

    const currentUser = getState().currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      const response = await api.deleteMember(accessToken, memberId);
      const result = await response.json();

      dispatch(deleteMember(result));
    } catch (e) {}

    dispatch(setIsUpdatingMembers(false));
  };
}

export const membersReducers = combineReducers({
  members,
  isLoading,
  isUpdating
});
