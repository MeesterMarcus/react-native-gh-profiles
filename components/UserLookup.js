import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import {Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

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

export default UserLookup;
