import * as api from './api';

import { createAction, createActionTypes, createReducer } from '../redux.utils';

import { combineReducers } from 'redux';
import { setChores } from '../chores/redux';
import { setMembers } from '../members/redux';

const types = createActionTypes('household', {
  IS_LOADING_SET: 'IS_LOADING_SET',
  IS_UPDATING_SET: 'IS_UPDATING_SET',

  NAME_SET: 'NAME_SET'
});

export const setIsLoadingHousehold = createAction(types.IS_LOADING_SET);
export const setIsUpdatingHousehold = createAction(types.IS_UPDATING_SET);

export const setHouseholdName = createAction(types.NAME_SET);

const isLoading = createReducer(false, {
  [types.IS_LOADING_SET]: (state, action) => action.payload
});

const isUpdating = createReducer(false, {
  [types.IS_UPDATING_SET]: (state, action) => action.payload
});

const householdName = createReducer('', {
  [types.NAME_SET]: (state, action) => action.payload
});

export function dispatchLoadHousehold() {
  return async function(dispatch, getState) {
    dispatch(setIsLoadingHousehold(true));

    const currentUser = getState().currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      const response = await api.getHousehold(accessToken);
      const result = await response.json();

      dispatch(setHouseholdName(result.houseName));
      dispatch(setMembers(result.members || []));
      dispatch(setChores(result.chores || []));
    } catch (e) {}

    dispatch(setIsLoadingHousehold(false));
  };
}

export function dispatchUpdateHousehold(name) {
  return async function(dispatch, getState) {
    dispatch(setIsUpdatingHousehold(true));

    const currentUser = getState().currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      const response = await api.postHousehold(accessToken, name);
      const result = await response.json();

      dispatch(setHouseholdName(result.houseName));
    } catch (e) {}

    dispatch(setIsUpdatingHousehold(false));
  };
}

export function dispatchCreateHousehold(name) {
  return async function(dispatch, getState) {
    dispatch(setIsUpdatingHousehold(true));

    const currentUser = getState().currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      const response = await api.postHousehold(accessToken, name);
      const result = await response.json();

      dispatch(setHouseholdName(result.houseName));
    } catch (e) {}

    dispatch(setIsUpdatingHousehold(false));
  };
}

export const householdReducers = combineReducers({
  householdName,
  isLoading,
  isUpdating
});
