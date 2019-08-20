import React, { Component, useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { createDeck } from '../src/storage';

const CreateDeckScreen = () => {
  const [title, setTitle] = useState('');

  return (
    <View>
      <Text>This is where we'll create new decks</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={title => setTitle(title)}
        value={title}
        placeholder="enter deck name"
      />
      <Button
        onPress={() => {
          createDeck(title);
          setTitle('');
        }}
        title="create deck"
      />
    </View>
  );
};

CreateDeckScreen.navigationOptions = {
  title: 'CreateDeck'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

export default CreateDeckScreen;
