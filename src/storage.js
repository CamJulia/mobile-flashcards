import { AsyncStorage, Alert } from 'react-native';

const getDeck = async title => {
  try {
    const deck = await AsyncStorage.getItem(title);
    return JSON.parse(deck);
  } catch (error) {
    Alert.alert('Something went wrong while retrieving the deck');
  }
};

const getDecks = async () => {
  try {
    const allDeckKeys = await AsyncStorage.getAllKeys();
    const rawDecks = await AsyncStorage.multiGet(allDeckKeys);

    const decks = rawDecks.map(deck => {
      return JSON.parse(deck[1]);
    });

    return decks;
  } catch (error) {
    Alert.alert('Something went wrong while retrieving the decks');
  }
};

const createDeck = async title => {
  try {
    const deck = await AsyncStorage.getItem(title);
    if (deck) throw 'Exists';
    await AsyncStorage.setItem(title, JSON.stringify({ title, cards: [] }));
  } catch (error) {
    if (error === 'Exists') {
      Alert.alert('Deck with this name already exists');
      return;
    }
    Alert.alert('Something went wrong while saving the deck');
  }
};

const removeDeck = async title => {
  try {
    await AsyncStorage.removeItem(title);
  } catch (error) {
    Alert.alert('Something went wrong while removing the deck');
  }
};

const addCardToDeck = async (deckTitle, card) => {
  try {
    const JSONdeck = await AsyncStorage.getItem(deckTitle);
    const deck = JSON.parse(JSONdeck);
    deck.cards.push(card);
    await AsyncStorage.setItem(deckTitle, JSON.stringify(deck));
  } catch (error) {
    Alert.alert('Something went wrong while saving the card');
  }
};

export { getDeck, getDecks, createDeck, addCardToDeck, removeDeck };
