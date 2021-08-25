/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Appbar} from 'react-native-paper';
import UserLookup from './UserLookup';
import CardList from './CardList';
import styles from './Styles';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [profiles, setProfiles] = React.useState([]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const addNewProfile = profileData => {
    setProfiles(oldArray => [...oldArray, profileData]);
  };

  const removeProfile = profileId => {
    const array = [...profiles];
    const index = array.indexOf(profileId);
    array.splice(index, 1);
    setProfiles(array);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Appbar style={[styles.bottom, {marginBottom: 10}]}>
          <Appbar.Content title="Github Profiles" subtitle="by Marcus" />
        </Appbar>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <UserLookup onSubmit={addNewProfile} />
          <CardList onDelete={removeProfile} profiles={profiles} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
