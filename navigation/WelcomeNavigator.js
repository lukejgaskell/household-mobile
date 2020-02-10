import CreateHousehold from '../screens/CreateHousehold';
import EditChore from '../screens/EditChore';
import EditChores from '../screens/EditChores';
import EditRoomates from '../screens/EditRoomates';
import InviteRoomates from '../screens/InviteRoomates';
import LoginScreen from '../screens/LoginScreen';
import NavOptions from '../constants/NavOptions';
import RecordAChore from '../screens/RecordAChore';
import Settings from '../screens/Settings';
import ViewChores from '../screens/ViewChores';
import ViewHousehold from '../screens/ViewHousehold';
import { createStackNavigator } from 'react-navigation-stack';

const WelcomeStack = createStackNavigator({
  [NavOptions.Home]: LoginScreen,
  [NavOptions.CreateHousehold]: CreateHousehold,
  [NavOptions.ViewChores]: ViewChores,
  [NavOptions.EditChore]: EditChore,
  [NavOptions.InviteRoomates]: InviteRoomates,
  [NavOptions.ViewHousehold]: ViewHousehold,
  [NavOptions.RecordAChore]: RecordAChore,
  [NavOptions.Settings]: Settings,
  [NavOptions.EditChores]: EditChores,
  [NavOptions.EditRoomates]: EditRoomates
});

WelcomeStack.path = '';

export default WelcomeStack;
