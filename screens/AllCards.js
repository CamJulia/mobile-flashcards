import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { getDeck } from '../src/storage';

export default class AllCards extends React.Component {
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
    if (!this.state.deck)
      return <ActivityIndicator color="black" style={{ flex: 1 }} size={50} />;
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.deck &&
            this.state.deck.cards.map(card => {
              return (
                <View key={card.question} style={styles.card}>
                  <Text style={styles.question}>{card.question}</Text>
                  <Text style={styles.answer}>{card.answer}</Text>
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

AllCards.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state;

  return {
    title: params.title
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  card: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'beige',
    margin: 5
  },
  question: {
    fontSize: 20,
    color: 'brown'
  },
  answer: {
    fontSize: 18,
    color: 'brown'
  }
});
