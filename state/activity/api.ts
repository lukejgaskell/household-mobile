import { Activity } from './models';
import axios from '../../utilities/axios';

export function getActivity(accessToken: string) {
  return axios(`activity`, {
    headers: {
      Authorization: accessToken,
    },
  });
}

export function postActivity(accessToken: string, activity: Activity) {
  return axios(`activity`, {
    method: 'POST',
    headers: {
      Authorization: accessToken,
    },
    data: JSON.stringify(activity),
  });
}
