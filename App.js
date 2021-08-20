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
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import {
  Appbar,
  Button,
  Paragraph,
  Avatar,
  TextInput,
  Card,
} from 'react-native-paper';

const CardWrapper = ({profile}): Node => {
  return (
    <Card>
      <Card.Title
        title={profile.login}
        left={() => (
          <Avatar.Image size={42} source={{uri: profile.avatar_url}} />
        )}
      />
      <Card.Content>
        <Paragraph>Name: {profile.name}</Paragraph>
        <Paragraph>Bio: {profile.bio}</Paragraph>
        <Paragraph>Location: {profile.location}</Paragraph>
        <Paragraph>Blog: {profile.blog}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const CardList = ({profiles}): Node => {
  console.log('card list profiles:', profiles);
  return profiles.map(profile => (
    <CardWrapper key={profile.id} profile={profile} />
  ));
};

const UserLookup = ({onSubmit}): Node => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const submit = async data => {
    const response = await axios.get(
      `https://api.github.com/users/${data.userName}`,
    );
    onSubmit(response.data);
  };

  return (
    <View>
      {/*<Text*/}
      {/*  style={[*/}
      {/*    styles.sectionTitle,*/}
      {/*    {*/}
      {/*      color: Colors.black,*/}
      {/*      borderStyle: 'dotted',*/}
      {/*    },*/}
      {/*  ]}>*/}
      {/*  Enter GitHub Username:*/}
      {/*</Text>*/}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            label="GitHub Username"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="userName"
        defaultValue=""
      />
      {errors.userName && <Text>This is required.</Text>}
      <Button
        style={{
          marginTop: 10,
          marginBottom: 10,
          width: '50%',
          alignSelf: 'center',
        }}
        mode="contained"
        onPress={handleSubmit(submit)}>
        Submit
      </Button>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [profiles, setProfiles] = React.useState([]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const addNewProfile = profileData => {
    setProfiles(oldArray => [...oldArray, profileData]);
    console.log('profiles object:', profiles);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Appbar style={[styles.bottom, {marginBottom: 10}]}>
        <Appbar.Content title="Github Profiles" subtitle="by Marcus" />
      </Appbar>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <UserLookup onSubmit={addNewProfile} />
          <CardList profiles={profiles} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
