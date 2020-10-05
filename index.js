/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { initializeFirebase } from './firebase';

AppRegistry.registerComponent(appName, () => App);
initializeFirebase();
