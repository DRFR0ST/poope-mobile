import React from 'react';
import {
  StatusBar
} from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ProfileSelectionScreen from './screens/ProfileSelectionScreen';
import NewMealScreen from './screens/NewMealScreen';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />

        <ModalStack.Navigator mode="modal">

          <ModalStack.Screen
            name="Main"
            component={MainStack}
            options={{ headerShown: false }} />

          <ModalStack.Screen name="NewMeal" component={NewMealScreen} />

        </ModalStack.Navigator>
      </NavigationContainer>
    </>
  );
};

const MainStack = () => {
  return <Stack.Navigator initialRouteName="ProfileSelection">
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
  </Stack.Navigator>;
}

export default App;
