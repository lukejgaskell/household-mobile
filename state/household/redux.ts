import * as api from './api';

import { Dispatch, combineReducers } from 'redux';
import { createAction, createActionTypes, createReducer } from '../redux.utils';

import { AppState } from '../store';
import { Household } from './models';
import { setChores } from '../chores/redux';
import { setMembers } from '../members/redux';

const types = createActionTypes('household', {
  IS_LOADING_SET: 'IS_LOADING_SET',
  IS_UPDATING_SET: 'IS_UPDATING_SET',

  NAME_SET: 'NAME_SET',
});

export const setIsLoadingHousehold = createAction(types.IS_LOADING_SET);
export const setIsUpdatingHousehold = createAction(types.IS_UPDATING_SET);

export const setHouseholdName = createAction(types.NAME_SET);

const isLoading = createReducer(false, {
  [types.IS_LOADING_SET]: (state, action) => action.payload,
});

const isUpdating = createReducer(false, {
  [types.IS_UPDATING_SET]: (state, action) => action.payload,
});

const householdName = createReducer('', {
  [types.NAME_SET]: (state, action) => action.payload,
});

export function dispatchLoadHousehold() {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsLoadingHousehold(true));

    const currentUser = getState().user.currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      const result: Household = await api.getHousehold(accessToken);

      dispatch(setHouseholdName(result.name));
      dispatch(setMembers(result.members || []));
      dispatch(setChores(result.chores || []));
    } catch (e) {}

    dispatch(setIsLoadingHousehold(false));
  };
}

export function dispatchUpdateHousehold(name: string) {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsUpdatingHousehold(true));

    const currentUser = getState().user.currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      const result: Household = await api.postHousehold(accessToken, name);

      dispatch(setHouseholdName(result.name));
    } catch (e) {}

    dispatch(setIsUpdatingHousehold(false));
  };
}

export function dispatchCreateHousehold(name: string) {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsUpdatingHousehold(true));

    const currentUser = getState().user.currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      const result: Household = await api.postHousehold(accessToken, name);

      dispatch(setHouseholdName(result.name));
    } catch (e) {}

    dispatch(setIsUpdatingHousehold(false));
  };
}

export const householdReducers = combineReducers({
  householdName,
  isLoading,
  isUpdating,
});
