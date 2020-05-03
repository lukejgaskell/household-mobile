import { Member } from './models';
import axios from '../../utilities/axios';

export function getMembers(accessToken: string) {
  return axios(`members`, {
    headers: {
      Authorization: accessToken,
    },
  });
}

export function postMember(accessToken: string, member: Member) {
  return axios(`members`, {
    method: 'POST',
    headers: {
      Authorization: accessToken,
    },
    data: JSON.stringify(member),
  });
}

export function deleteMember(accessToken: string, member: Member) {
  return axios(`members`, {
    method: 'DELETE',
    headers: {
      Authorization: accessToken,
    },
    data: JSON.stringify(member),
  });
}
