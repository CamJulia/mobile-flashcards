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
import { getDeck, addCardToDeck, removeDeck } from '../src/storage';

export default class DeckDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: null
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
        <View style={{ margin: 10 }}>
          <Button
            onPress={() => {
              this.props.navigation.navigate('AllCards', {
                title: deck.title
              });
            }}
            title="Check out stack"
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            onPress={() => {
              this.props.navigation.navigate('CardDetail', {
                title: deck.title
              });
            }}
            title="Flash it!"
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            onPress={() => {
              this.props.navigation.navigate('AddCard', {
                title: deck.title
              });
            }}
            title="Add card to deck"
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            onPress={() => {
              removeDeck(deck.title);
              this.props.navigation.navigate('DeckHome');
            }}
            color="tomato"
            title="Remove deck"
          />
        </View>
      </View>
    );
  }
}

DeckDetail.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state;

  return {
    title: params.title
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  }
});
