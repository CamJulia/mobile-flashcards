import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View
} from 'react-native';
import { getDeck, addCardToDeck } from '../src/storage';

export default class AddCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: null,
      title: '',
      body: ''
    };
  }

  async componentDidMount() {
    const { params } = this.props.navigation.state;
    const deck = await getDeck(params.title);
    this.setState({ deck });
  }

  render() {
    const { deck, title, body } = this.state;

    if (!deck) return null;

    return (
      <View style={styles.container}>
        <View>
          <Text>This is where we'll create new cards</Text>
          <TextInput
            style={{
              height: 40,
              marginVertical: 10,
              paddingHorizontal: 5,
              borderColor: 'gray',
              borderWidth: 1
            }}
            onChangeText={title => this.setState({ title })}
            value={title}
            placeholder="enter card title"
            autoCompleteType="off"
            autoCorrect={false}
          />
          <TextInput
            style={{
              height: 40,
              marginVertical: 10,
              paddingHorizontal: 5,
              borderColor: 'gray',
              borderWidth: 1
            }}
            onChangeText={body => this.setState({ body })}
            value={body}
            placeholder="enter card body"
            autoCompleteType="off"
            autoCorrect={false}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Button
            onPress={() => {
              addCardToDeck(deck.title, { title, body });
              this.setState({ title: '', body: '' });
              this.props.navigation.goBack(null);
            }}
            title="create card"
          />
        </View>
      </View>
    );
  }
}

AddCard.navigationOptions = () => ({ title: 'Add Card to Deck' });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'space-between'
  }
});
