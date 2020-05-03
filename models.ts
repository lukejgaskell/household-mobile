import { Chore } from './state/chores/models';

export type RootStackParamList = {
  Login: undefined;
  EditChore: { chore: Chore } | undefined;
  ViewHousehold: undefined;
  RecordAChore: undefined;
  Settings: undefined;
  EditChores: undefined;
  EditRoomates: undefined;
};

export type WelcomeStackParamList = {
  CreateHousehold: undefined;
  InviteRoomates: undefined;
  ViewChores: undefined;
};

export type LoginStackParamList = {
  Login: undefined;
};
