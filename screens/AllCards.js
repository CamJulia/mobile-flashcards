import React from 'react';
import {
  TouchableOpacity,
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
              if (card.title) {
                return (
                  <TouchableOpacity
                    key={card.title}
                    style={{
                      height: 100,
                      backgroundColor: 'tomato',
                      margin: 15
                    }}>
                    <Text>{card.title}</Text>
                    <Text>{card.body}</Text>
                  </TouchableOpacity>
                );
              }
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
  deck: {
    height: 300
  }
});
