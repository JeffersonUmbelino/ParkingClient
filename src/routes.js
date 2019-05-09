import { createStackNavigator, createAppContainer } from 'react-navigation';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/main';

const Routes = createStackNavigator({
  SignIn,
  SignUp,
  Main,
});

const App = createAppContainer(Routes);

export default App;