import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { getDecks } from '../src/storage';

export default class DeckHomeScreen extends React.Component {
  state = {
    decks: null
  };

  async componentDidMount() {
    this._navListener = this.props.navigation.addListener(
      'didFocus',
      async () => {
        const decks = await getDecks();
        this.setState({ decks });
      }
    );
  }

  render() {
    if (!this.state.decks)
      return <ActivityIndicator color="black" style={{ flex: 1 }} size={50} />;
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.decks &&
            this.state.decks.map(deck => {
              if (deck.title) {
                return (
                  <TouchableOpacity
                    key={deck.title}
                    style={styles.deck}
                    onPress={() => {
                      this.props.navigation.navigate('DeckDetails', {
                        title: deck.title
                      });
                    }}>
                    <Text style={styles.deckText}>{deck.title}</Text>
                    <Text>
                      {deck.cards.length} card
                      {deck.cards.length > 1 || !deck.cards.length ? 's' : ''}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
        </ScrollView>
      </View>
    );
  }
}

DeckHomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30
  },
  deck: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    margin: 5
  },
  deckText: {
    fontSize: 20,
    color: 'white'
  }
});
