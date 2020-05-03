import { Activity } from '../activity/models';
import { Chore } from '../chores/models';
import { Member } from '../members/models';

export interface Household {
  name: string;
  activity: Activity[];
  chores: Chore[];
  members: Member[];
}
