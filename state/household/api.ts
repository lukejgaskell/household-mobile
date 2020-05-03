import axios from '../../utilities/axios';

export function getHousehold(accessToken: string) {
  return axios(`houses`, {
    headers: {
      Authorization: accessToken,
    },
  });
}

export function postHousehold(accessToken: string, name: string) {
  return axios(`houses`, {
    method: 'POST',
    headers: {
      Authorization: accessToken,
    },
    data: JSON.stringify({
      name,
    }),
  });
}
