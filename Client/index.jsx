import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function Main() {
  return (
    <PaperProvider
    settings={{
        icon: props => <AwesomeIcon {...props} />,
      }}
    >
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);