import React from 'react';
import {Avatar, Card, Paragraph} from 'react-native-paper';

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

export default CardWrapper;
