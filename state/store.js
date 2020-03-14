import { applyMiddleware, createStore } from 'redux';

import { activityReducers } from './activity/redux';
import { createReducer } from './redux.utils';
import { householdReducers } from './household/redux';
import { invitesReducers } from './invites/redux';
import { membersReducers } from './members/redux';
import thunk from 'redux-thunk';
import { userReducers } from './users/redux';

const rootReducer = createReducer({
  userReducers,
  householdReducers,
  activityReducers,
  invitesReducers,
  membersReducers
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
