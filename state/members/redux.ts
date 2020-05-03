import * as api from './api';

import { ActionType, createAction, createActionTypes, createReducer } from '../redux.utils';
import { Dispatch, combineReducers } from 'redux';

import { AppState } from '../store';
import { Member } from './models';

const types = createActionTypes('members', {
  IS_LOADING_SET: 'IS_LOADING_SET',
  IS_UPDATING_SET: 'IS_UPDATING_SET',

  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
});

export const setIsLoadingMembers = createAction(types.IS_LOADING_SET);
export const setIsUpdatingMembers = createAction(types.IS_UPDATING_SET);

export const setMembers = createAction(types.SET);
export const addMember = createAction(types.ADD);
export const deleteMember = createAction(types.DELETE);
export const updateMembers = createAction(types.UPDATE);

const isLoading = createReducer(false, {
  [types.IS_LOADING_SET]: (state, action) => action.payload,
});

const isUpdating = createReducer(false, {
  [types.IS_UPDATING_SET]: (state, action) => action.payload,
});

const members = createReducer<Member[]>([], {
  [types.ADD]: (state: Member[], action: ActionType<Member>) => [...state, { ...action.payload }],
  [types.DELETE]: (state: Member[], action: ActionType<Member>) =>
    state.filter((m) => action.payload?.email !== m.email),
  [types.SET]: (state: Member[], action: ActionType<Member[]>) => [...action.payload],
  [types.UPDATE]: (state: Member[], action: ActionType<Member>) =>
    state.map((m) => {
      if (m.email === action.payload?.email) {
        return action.payload;
      }
      return m;
    }),
});

export function dispatchLoadMembers() {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsLoadingMembers(true));

    const accessToken = getState().user.currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      const resp = await api.getMembers(accessToken);

      dispatch(setMembers(resp || []));
    } catch (e) {}

    dispatch(setIsLoadingMembers(false));
  };
}

export function dispatchAddMember(member: Member) {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsUpdatingMembers(true));

    const currentUser = getState().user.currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      const resp = await api.postMember(accessToken, member);

      dispatch(addMember(resp));
    } catch (e) {}

    dispatch(setIsUpdatingMembers(false));
  };
}

export function dispatchAddMembers(members: Member[]) {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsUpdatingMembers(true));

    const currentUser = getState().user.currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      console.log('members', members);

      for (let i = 0; i < members.length; i++) {
        const result = await api.postMember(accessToken, members[i]);
        dispatch(addMember(result));
      }
    } catch (e) {}

    dispatch(setIsUpdatingMembers(false));
  };
}

export function dispatchDeleteMember(member: Member) {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsUpdatingMembers(true));

    const currentUser = getState().user.currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      const result = await api.deleteMember(accessToken, member);

      dispatch(deleteMember(result));
    } catch (e) {}

    dispatch(setIsUpdatingMembers(false));
  };
}

export const membersReducers = combineReducers({
  members,
  isLoading,
  isUpdating,
});
