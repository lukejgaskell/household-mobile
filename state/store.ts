import { applyMiddleware, combineReducers, createStore } from 'redux';

import { activityReducers } from './activity/redux';
import { choresReducers } from './chores/redux';
import { householdReducers } from './household/redux';
import { membersReducers } from './members/redux';
import thunk from 'redux-thunk';
import { userReducers } from './users/redux';

export type AppState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  user: userReducers,
  house: householdReducers,
  activity: activityReducers,
  members: membersReducers,
  chores: choresReducers
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
