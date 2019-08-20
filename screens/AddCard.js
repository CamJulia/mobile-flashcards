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
      <View style={{ margin: 20 }}>
        <Text>This is where we'll create new cards</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={title => this.setState({ title })}
          value={title}
          placeholder="enter card title"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={body => this.setState({ body })}
          value={body}
          placeholder="enter card body"
        />
        <Button
          onPress={() => {
            addCardToDeck(deck.title, { title, body });
            this.setState({ title: '', body: '' });
            this.props.navigation.goBack(null);
          }}
          title="create card"
        />
      </View>
    );
  }
}

AddCard.navigationOptions = () => ({ title: 'Add Card to Deck' });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  }
});
