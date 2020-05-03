import { Chore } from './models';
import axios from '../../utilities/axios';

export function getChores(accessToken: string) {
  return axios(`activity`, {
    headers: {
      Authorization: accessToken,
    },
  });
}

export function postChore(accessToken: string, chore: Chore) {
  return axios(`chores`, {
    method: 'POST',
    headers: {
      Authorization: accessToken,
    },
    data: JSON.stringify(chore),
  });
}

export function putChore(accessToken: string, chore: Chore) {
  return axios(`chores`, {
    method: 'PUT',
    headers: {
      Authorization: accessToken,
    },
    data: JSON.stringify(chore),
  });
}

export function deleteChore(accessToken: string, chore: Chore) {
  return axios(`chores`, {
    method: 'DELETE',
    headers: {
      Authorization: accessToken,
    },
    data: JSON.stringify(chore),
  });
}
