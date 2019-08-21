import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { createDeck } from '../src/storage';

const CreateDeckScreen = () => {
  const [title, setTitle] = useState('');

  return (
    <View style={styles.container}>
      <Text>This is where we'll create new decks</Text>

      <TextInput
        style={{
          height: 40,
          marginVertical: 10,
          paddingHorizontal: 5,
          borderColor: 'gray',
          borderWidth: 1
        }}
        onChangeText={title => setTitle(title)}
        value={title}
        placeholder="Enter deck name"
        autoCompleteType="off"
        autoCorrect={false}
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
    backgroundColor: '#fff',
    margin: 20
  }
});

export default CreateDeckScreen;
