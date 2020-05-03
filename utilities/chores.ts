import { Chore } from '../state/chores/models';

export function isMaxChores(chores: Chore[]) {
  return chores.length > 9;
}
