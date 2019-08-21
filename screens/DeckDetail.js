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

    this._navListener = this.props.navigation.addListener(
      'didFocus',
      async () => {
        const deck = await getDeck(params.title);
        this.setState({ deck });
      }
    );
  }

  render() {
    const { deck, title, body } = this.state;

    if (!deck) return null;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{deck.title}</Text>
          <Text>{deck.cards.length} cards</Text>
        </View>
        <View>
          <View style={styles.button}>
            <Button
              onPress={() => {
                this.props.navigation.navigate('AddCard', {
                  title: deck.title
                });
              }}
              title="Add card"
            />
          </View>

          {!!deck.cards.length && (
            <>
              <View style={styles.button}>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate('Quiz', {
                      deck
                    });
                  }}
                  title="Start quiz"
                />
              </View>

              <View style={styles.button}>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate('AllCards', {
                      title: deck.title
                    });
                  }}
                  title="Check out stack"
                />
              </View>
            </>
          )}
          <View style={styles.button}>
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
    justifyContent: 'space-between'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  headerText: {
    fontSize: 20
  },
  button: {
    margin: 20
  }
});
