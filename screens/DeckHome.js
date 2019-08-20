import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View
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

  componentWillUnmount() {
    this._navListener = this.props.navigation.removeListener('didFocus');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.decks &&
            this.state.decks.map(deck => {
              if (deck.title) {
                return (
                  <TouchableOpacity
                    key={deck.title}
                    style={{
                      height: 100,
                      backgroundColor: 'tomato',
                      margin: 15
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('DeckDetails', {
                        title: deck.title
                      });
                    }}>
                    <Text>{deck.title}</Text>
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
    backgroundColor: '#fff'
  },
  deck: {
    height: 300
  }
});
