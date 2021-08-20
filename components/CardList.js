import React from 'react';
import CardWrapper from './CardWrapper';

const CardList = ({profiles}): Node => {
  return profiles.map(profile => (
    <CardWrapper key={profile.id} profile={profile} />
  ));
};

export default CardList;
