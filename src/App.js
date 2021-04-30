import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import { cardValues, newDeck, aces } from './components/Cards/deck';
import Cards from './components/Cards/Cards';
import Bank from './components/Bank/Bank';
import Controls from './components/Controls/Controls';
import ResultsMessage from './components/Results/ResultsMessage/ResultsMessage';
import Scores from './components/Results/Scores/Scores';

const initialState = {
  playerScore: 0,
  dealerScore: 0,
  playerHand: ['cardBack', 'cardBack'],
  dealerHand: [],
  dealerHandHidden: ['cardBack', 'cardBack'],
  dealerHidden: true,
  currentDeck: [...newDeck],
  handDealt: false,
  playerStand: false,
  playerBusted: false,
  dealerBusted: false,
  result: '',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  getRandomCard = () => {
    const currentDeckCopy = [...this.state.currentDeck];
    const randomNumber = Math.floor(Math.random() * (currentDeckCopy.length - 1));
    const cardName = currentDeckCopy[randomNumber];
    currentDeckCopy.splice(randomNumber, 1);
    this.setState({ currentDeck: currentDeckCopy });
    return cardName;
  };

  dealHand = () => {
    if (this.state.handDealt === true) {
      return null;
    }
    const playerHand = [this.getRandomCard(), this.getRandomCard()];
    const dealerHand = [this.getRandomCard(), this.getRandomCard()];
    this.setState(
      {
        handDealt: true,
        playerHand: playerHand,
        dealerHand: dealerHand,
      },
      () => this.calculatePlayerScore()
    );
  };

  hit = () => {
    // If the hand isn't dealt yet we can't hit
    if (this.state.handDealt === false) {
      return null;
    }
    // Create a copy of the player's hand array from state
    const newHand = [...this.state.playerHand];
    // Push a new random card from the deck onto the player's hand
    newHand.push(this.getRandomCard());
    // Write the player's new hand to state and then calculate their new score
    this.setState({ playerHand: newHand }, () => this.calculatePlayerScore());
  };

  calculatePlayerScore = () => {
    let newPlayerScore = 0;
    let playerAcesCount = 0;
    // Loop through all cards in the player's hand
    this.state.playerHand.forEach((card) => {
      // Add each card value to the score
      newPlayerScore += cardValues[card];
      // Keep track of any Aces in the hand
      if (aces.includes(card)) {
        playerAcesCount++;
      }
      // If the player has Aces in their hand and they've "busted" (gone over score of 21), make the Ace count for 1 instead of 11 and remove the ace from the tracker.
      if (newPlayerScore > 21 && playerAcesCount > 0) {
        newPlayerScore -= 10;
        playerAcesCount--;
      }
    });
    // If the player has "busted" (score over 21), write the score to state and then call playerBusted(). In this scenario the dealer wins by default and does not need to play out their hand with playDealerHand() ).
    if (newPlayerScore > 21) {
      this.setState({ playerScore: newPlayerScore }, () => this.playerBusted());
    }
    // Otherwise, just write the new score to state.
    else {
      this.setState({ playerScore: newPlayerScore });
    }
  };

  playerBusted = () => {
    // The dealer doesn't need to play out their hand but this will calculate the score of their initial hand so we can at least display it.
    let newDealerScore = 0;
    let dealerAcesCount = 0;
    this.state.dealerHand.forEach((card) => {
      newDealerScore += cardValues[card];
      if (aces.includes(card)) {
        dealerAcesCount++;
      }
      if (newDealerScore > 21 && dealerAcesCount > 0) {
        newDealerScore -= 10;
        dealerAcesCount--;
      }
    });
    this.setState(
      {
        playerBusted: true,
        result: 'dealer',
        dealerHidden: false,
        dealerScore: newDealerScore,
        playerStand: true,
      },
      () => this.handOver()
    );
  };

  // When the player "stands" (finishes playing their hand) it's time for the dealer to play their hand. This is all dealer hit/stand logic.
  playDealerHand = () => {
    let newDealerScore = 0;
    let dealerAcesCount = 0;
    const newHand = [...this.state.dealerHand];
    // Same score calculating and ace checking logic as in calculatePlayerScore() above. Calculates the score for the dealer's initial hand (two cards).
    newHand.forEach((card) => {
      newDealerScore += cardValues[card];
      if (aces.includes(card)) {
        dealerAcesCount++;
      }
      if (newDealerScore > 21 && dealerAcesCount > 0) {
        newDealerScore -= 10;
        dealerAcesCount--;
      }
    });
    // Need to check each new card (hit) at a time to avoid looping within the while loop. As per blackjack rules, the dealer must hit if their score is below 17 and must stand once they reach at least 17.
    while (newDealerScore < 17) {
      const newCard = this.getRandomCard();
      newHand.push(newCard);
      newDealerScore += cardValues[newCard];
      if (aces.includes(newCard)) {
        dealerAcesCount++;
      }
      if (newDealerScore > 21 && dealerAcesCount > 0) {
        newDealerScore -= 10;
        dealerAcesCount--;
      }
    }
    this.setState({ dealerHand: newHand, dealerScore: newDealerScore }, () => this.handOver());
  };

  handOver = () => {
    if (this.state.playerScore === this.state.dealerScore) {
      this.setState({ result: 'tied' });
    } else if (this.state.playerScore > 21) {
      this.setState({ result: 'dealer', playerBusted: true });
    } else if (this.state.dealerScore > 21) {
      this.setState({ result: 'player', dealerBusted: true });
    } else if (this.state.playerScore > this.state.dealerScore) {
      this.setState({ result: 'player' });
    } else if (this.state.playerScore < this.state.dealerScore) {
      this.setState({ result: 'dealer' });
    } else {
      console.log('Something went wrong');
    }
    this.setState({ dealerHidden: false, playerStand: true });
  };

  // TODO Add logic to maintain the state of the deck instead of completely resetting it every hand.
  resetHand = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <div className='App'>
        <Navbar bg='dark' variant='dark' className='justify-content-center'>
          <Navbar.Brand href='#home'>Let's Play Blackjack!</Navbar.Brand>
        </Navbar>
        <Container style={{ textAlign: 'center' }}>
          <ResultsMessage
            result={this.state.result}
            playerBusted={this.state.playerBusted}
            dealerBusted={this.state.dealerBusted}
          />
          <Cards
            dealerHand={
              this.state.dealerHidden ? this.state.dealerHandHidden : this.state.dealerHand
            }
            playerHand={this.state.playerHand}
          />
          <Scores
            dealerHidden={this.state.dealerHidden}
            dealerScore={this.state.dealerScore}
            playerScore={this.state.playerScore}
          />
          <Bank />
          <Controls
            handDealt={this.state.handDealt}
            playerStand={this.state.playerStand}
            deal={this.dealHand}
            hit={this.hit}
            reset={this.resetHand}
            playDealer={this.playDealerHand}
          />
        </Container>
      </div>
    );
  }
}

export default App;
