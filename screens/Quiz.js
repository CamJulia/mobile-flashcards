import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ActivityIndicator
} from 'react-native';

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: null,
      showAnswer: false,
      correct: 0,
      wrong: 0
    };
  }

  async componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({ deck: params.deck });
    this.cardIndex = this.getCardIndex(params.deck.cards);
  }

  getCardIndex = cards => Math.floor(Math.random() * cards.length);

  render() {
    console.log('this.state: ', this.state);

    if (!this.state.deck)
      return <ActivityIndicator color="black" style={{ flex: 1 }} size={50} />;

    if (this.state.deck.cards.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{ fontSize: 26, marginBottom: 10 }}>
            All done, good job!
          </Text>
          <Text style={{ fontSize: 24 }}>Your score:</Text>
          <Text style={{ fontSize: 20 }}>Correct {this.state.correct}</Text>
          <Text style={{ fontSize: 20 }}>Wrong {this.state.wrong}</Text>
        </View>
      );
    }

    const { cards } = this.state.deck;

    const currentCard = cards[this.cardIndex];

    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}>
          <Text style={{ fontSize: 24 }}>{currentCard.question}</Text>
          {this.state.showAnswer && (
            <>
              <Text style={{ fontSize: 20 }}>{currentCard.answer}</Text>
              <View
                style={{
                  width: '100%'
                }}>
                <Button
                  title="correct"
                  onPress={() => {
                    const deck = { ...this.state.deck };
                    deck.cards.splice(this.cardIndex, 1);
                    this.cardIndex = this.getCardIndex(deck.cards);

                    this.setState({
                      correct: this.state.correct + 1,
                      showAnswer: false,
                      deck
                    });
                  }}
                  color="green"
                />
              </View>
              <View
                style={{
                  width: '100%'
                }}>
                <Button
                  title="wrong"
                  onPress={() => {
                    const deck = { ...this.state.deck };
                    deck.cards.splice(this.cardIndex, 1);
                    this.cardIndex = this.getCardIndex(deck.cards);

                    this.setState({
                      wrong: this.state.wrong + 1,
                      showAnswer: false,
                      deck
                    });
                  }}
                  color="red"
                />
              </View>
            </>
          )}
        </View>
        {!this.state.showAnswer && (
          <View>
            <Button
              title="show answer"
              onPress={() => {
                this.setState({ showAnswer: true });
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

Quiz.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state;

  return {
    title: `${params.deck.title} quiz`
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'space-between'
  }
});
