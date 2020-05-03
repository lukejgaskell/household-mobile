import { Activity } from '../state/activity/models';

export function getScore(activity: Activity[], email: string | undefined) {
  return activity
    .filter((a) => a.completedByEmail === email)
    .reduce((acc, curr) => {
      return acc + curr?.points;
    }, 0);
}
