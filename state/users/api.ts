import { User } from './models';
import axios from '../../utilities/axios';

export function getUser(idToken: string) {
  return axios(`users`, {
    headers: {
      Authorization: idToken,
    },
  });
}

export function updateUser(idToken: string, showWelcome?: boolean) {
  return axios(`users`, {
    method: 'POST',
    headers: {
      Authorization: idToken,
    },
    data: JSON.stringify({ showWelcome }),
  });
}
