import React from 'react';
import {Avatar, Card, Colors, IconButton, Paragraph} from 'react-native-paper';
import { View } from "react-native";

const CardList = ({profiles, onDelete}): Node => {
  const deleteIt = id => {
    onDelete(id);
  };
  return profiles.map(profile => (
    <View key={profile.id}>
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
        <Card.Actions>
          <IconButton
            icon="trash-can"
            color={Colors.red500}
            size={20}
            onPress={() => {
              deleteIt(profile.id);
            }}
          />
        </Card.Actions>
      </Card>
    </View>
  ));
};

export default CardList;
