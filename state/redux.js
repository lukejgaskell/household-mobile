import { createActionTypes, createAction, createReducer } from "./redux.utils";
import { combineReducers } from "redux";

const types = createActionTypes("root", {
  CHORES_SET: "CHORES_SET",
  CHORES_ADD: "CHORES_ADD",
  CHORES_DELETE: "CHORES_DELETE",
  CHORES_UPDATE: "CHORES_UPDATE",

  ACTIVITY_SET: "ACTIVITY_SET",
  ACTIVITY_ADD: "ACTIVITY_ADD",
  ACTIVITY_DELETE: "ACTIVITY_DELETE",
  ACTIVITY_UPDATE: "ACTIVITY_UPDATE",

  MEMBERS_SET: "MEMBERS_SET",
  MEMBERS_ADD: "MEMBERS_ADD",
  MEMBERS_DELETE: "MEMBERS_DELETE",
  MEMBERS_UPDATE: "MEMBERS_UPDATE",

  HOUSEHOLD_NAME_SET: "HOUSEHOLD_NAME_SET",

  CURRENT_USER_SET: "CURRENT_USER_SET"
});

export const setHouseholdName = createAction(types.HOUSEHOLD_NAME_SET);
export const setCurrentUser = createAction(types.CURRENT_USER_SET);

export const setChores = createAction(types.CHORES_SET);
export const addChores = createAction(types.CHORES_ADD);
export const deleteChores = createAction(types.CHORES_DELETE);
export const updateChores = createAction(types.CHORES_UPDATE);

export const setActivity = createAction(types.ACTIVITY_SET);
export const addActivity = createAction(types.ACTIVITY_ADD);
export const deleteActivity = createAction(types.ACTIVITY_DELETE);
export const updateActivity = createAction(types.ACTIVITY_UPDATE);

export const setMembers = createAction(types.MEMBERS_SET);
export const addMembers = createAction(types.MEMBERS_ADD);
export const deleteMembers = createAction(types.MEMBERS_DELETE);
export const updateMembers = createAction(types.MEMBERS_UPDATE);

const chores = createReducer([], {
  [types.CHORES_ADD]: (state, action) => [
    ...state,
    { ...action.payload, id: state.length }
  ],
  [types.CHORES_DELETE]: (state, action) =>
    state.filter(c => action.payload !== c.id),
  [types.CHORES_SET]: (state, action) => [...action.payload],
  [types.CHORES_UPDATE]: (state, action) =>
    state.map(c => {
      if (c.id === action.payload?.id) {
        return action.payload;
      }
      return c;
    })
});

const members = createReducer([], {
  [types.MEMBERS_ADD]: (state, action) => [
    ...state,
    { ...action.payload, id: state.length }
  ],
  [types.MEMBERS_DELETE]: (state, action) =>
    state.filter(m => action.payload !== m.id),
  [types.MEMBERS_SET]: (state, action) => [...action.payload],
  [types.MEMBERS_UPDATE]: (state, action) =>
    state.map(m => {
      if (m.id === action.payload?.id) {
        return action.payload;
      }
      return m;
    })
});

const activity = createReducer([], {
  [types.ACTIVITY_ADD]: (state, action) => [
    ...state,
    { ...action.payload, id: state.length }
  ],
  [types.ACTIVITY_DELETE]: (state, action) =>
    state.filter(m => action.payload !== m.id),
  [types.ACTIVITY_SET]: (state, action) => [...action.payload],
  [types.ACTIVITY_UPDATE]: (state, action) =>
    state.map(a => {
      if (a.id === action.payload?.id) {
        return action.payload;
      }
      return a;
    })
});

const householdName = createReducer("", {
  [types.HOUSEHOLD_NAME_SET]: (state, action) => action.payload
});
const currentUser = createReducer(null, {
  [types.CURRENT_USER_SET]: (state, action) => action.payload
});

export const reducers = combineReducers({
  chores,
  members,
  activity,
  householdName,
  currentUser
});
