import { combineReducers } from "redux";

export function createActionTypes(filename, typeObj) {
  for (const prop in typeObj) {
    if (typeObj.hasOwnProperty(prop)) {
      typeObj[prop] = typeObj[prop] + filename;
    }
  }
  return typeObj;
}

export function createAction(type) {
  return payload => {
    return {
      type,
      payload
    };
  };
}

export function createReducer(initial, reducersObj) {
  return (state = initial, action) => {
    const func = reducersObj[action.type];

    if (func) return func(state, action);

    return state;
  };
}
