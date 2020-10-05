import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { UserInfo } from './api/commands';
import { useCommand } from './api/hooks';
import { isLoaded } from './api/utils';
import MealListView from './components/shared/MealListView';
import CreateMealFab from './components/shared/CreateMealFab';
import { useForkedState } from './utils/hooks/general';

const App = () => {
  const userRequest = useCommand(UserInfo, "B3r7ivZXDX1mTssTVOzT")
  const [user] = useForkedState(rq => isLoaded(rq) ? rq.data : null, userRequest);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Hello {user && user.name}</Text>
            </View>
            <MealListView />
          </View>
        </ScrollView>
        <CreateMealFab />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
