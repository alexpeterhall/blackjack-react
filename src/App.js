import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import Cards from './components/Cards/Cards';
import Results from './components/Results/Results';
import Bank from './components/Bank';

const cardValues = {
  cardBack: 0,
  aceClubs: 11,
  twoClubs: 2,
  threeClubs: 3,
  fourClubs: 4,
  fiveClubs: 5,
  sixClubs: 6,
  sevenClubs: 7,
  eightClubs: 8,
  nineClubs: 9,
  tenClubs: 10,
  jackClubs: 10,
  queenClubs: 10,
  kingClubs: 10,
  aceSpades: 11,
  twoSpades: 2,
  threeSpades: 3,
  fourSpades: 4,
  fiveSpades: 5,
  sixSpades: 6,
  sevenSpades: 7,
  eightSpades: 8,
  nineSpades: 9,
  tenSpades: 10,
  jackSpades: 10,
  queenSpades: 10,
  kingSpades: 10,
  aceHearts: 11,
  twoHearts: 2,
  threeHearts: 3,
  fourHearts: 4,
  fiveHearts: 5,
  sixHearts: 6,
  sevenHearts: 7,
  eightHearts: 8,
  nineHearts: 9,
  tenHearts: 10,
  jackHearts: 10,
  queenHearts: 10,
  kingHearts: 10,
  aceDiamonds: 11,
  twoDiamonds: 2,
  threeDiamonds: 3,
  fourDiamonds: 4,
  fiveDiamonds: 5,
  sixDiamonds: 6,
  sevenDiamonds: 7,
  eightDiamonds: 8,
  nineDiamonds: 9,
  tenDiamonds: 10,
  jackDiamonds: 10,
  queenDiamonds: 10,
  kingDiamonds: 10,
};

const newDeck = [
  'aceClubs',
  'twoClubs',
  'threeClubs',
  'fourClubs',
  'fiveClubs',
  'sixClubs',
  'sevenClubs',
  'eightClubs',
  'nineClubs',
  'tenClubs',
  'jackClubs',
  'queenClubs',
  'kingClubs',
  'aceSpades',
  'twoSpades',
  'threeSpades',
  'fourSpades',
  'fiveSpades',
  'sixSpades',
  'sevenSpades',
  'eightSpades',
  'nineSpades',
  'tenSpades',
  'jackSpades',
  'queenSpades',
  'kingSpades',
  'aceHearts',
  'twoHearts',
  'threeHearts',
  'fourHearts',
  'fiveHearts',
  'sixHearts',
  'sevenHearts',
  'eightHearts',
  'nineHearts',
  'tenHearts',
  'jackHearts',
  'queenHearts',
  'kingHearts',
  'aceDiamonds',
  'twoDiamonds',
  'threeDiamonds',
  'fourDiamonds',
  'fiveDiamonds',
  'sixDiamonds',
  'sevenDiamonds',
  'eightDiamonds',
  'nineDiamonds',
  'tenDiamonds',
  'jackDiamonds',
  'queenDiamonds',
  'kingDiamonds',
  'aceClubs',
  'twoClubs',
  'threeClubs',
  'fourClubs',
  'fiveClubs',
  'sixClubs',
  'sevenClubs',
  'eightClubs',
  'nineClubs',
  'tenClubs',
  'jackClubs',
  'queenClubs',
  'kingClubs',
  'aceSpades',
  'twoSpades',
  'threeSpades',
  'fourSpades',
  'fiveSpades',
  'sixSpades',
  'sevenSpades',
  'eightSpades',
  'nineSpades',
  'tenSpades',
  'jackSpades',
  'queenSpades',
  'kingSpades',
  'aceHearts',
  'twoHearts',
  'threeHearts',
  'fourHearts',
  'fiveHearts',
  'sixHearts',
  'sevenHearts',
  'eightHearts',
  'nineHearts',
  'tenHearts',
  'jackHearts',
  'queenHearts',
  'kingHearts',
  'aceDiamonds',
  'twoDiamonds',
  'threeDiamonds',
  'fourDiamonds',
  'fiveDiamonds',
  'sixDiamonds',
  'sevenDiamonds',
  'eightDiamonds',
  'nineDiamonds',
  'tenDiamonds',
  'jackDiamonds',
  'queenDiamonds',
  'kingDiamonds',
];

const aces = ['aceClubs', 'aceSpades', 'aceHearts', 'aceDiamonds'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  generateRandomCard = () => {
    const currentDeckCopy = [...this.state.currentDeck];
    const randomNumber = Math.floor(
      Math.random() * (currentDeckCopy.length - 1)
    );
    const cardName = currentDeckCopy[randomNumber];
    currentDeckCopy.splice(randomNumber, 1);
    this.setState({ currentDeck: currentDeckCopy });
    return cardName;
  };

  dealHand = () => {
    if (this.state.handDealt === true) {
      return null;
    }
    const playerHand = [this.generateRandomCard(), this.generateRandomCard()];
    const dealerHand = [this.generateRandomCard(), this.generateRandomCard()];
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
    newHand.push(this.generateRandomCard());
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
      const newCard = this.generateRandomCard();
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
    this.setState({ dealerHand: newHand, dealerScore: newDealerScore }, () =>
      this.handOver()
    );
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
    this.setState({
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
    });
  };

  render() {
    return (
      <div className='App'>
        <Navbar bg='dark' variant='dark' className='justify-content-center'>
          <Navbar.Brand href='#home'>Let's Play Blackjack!</Navbar.Brand>
        </Navbar>
        <Container style={{ textAlign: 'center' }}>
          <Results
            result={this.state.result}
            playerBusted={this.state.playerBusted}
            dealerBusted={this.state.dealerBusted}
          />
          <Row lg={8} style={{ padding: '0 0 20px 0' }}>
            <Col>
              <Cards
                hand={
                  this.state.dealerHidden
                    ? this.state.dealerHandHidden
                    : this.state.dealerHand
                }
              />
            </Col>
            <Col>
              <Cards hand={this.state.playerHand} />
            </Col>
          </Row>
          <Row lg={8}>
            <Col>
              <h3>
                Score: {this.state.dealerHidden ? '?' : this.state.dealerScore}
              </h3>
            </Col>
            <Col>
              <h3>Score: {this.state.playerScore}</h3>
            </Col>
          </Row>
          <Row lg={8}>
            <Col>
              <Bank />
            </Col>
            <Col>
              <Bank />
            </Col>
          </Row>
          <Row style={{ padding: '30px 0 0 0' }}>
            <Col lg={{ span: 6, offset: 3 }}>
              <Button variant='outline-success' disabled>
                Place Bet
              </Button>{' '}
              <Button
                variant='outline-primary'
                onClick={() => this.dealHand()}
                disabled={this.state.handDealt}>
                Deal Hand
              </Button>{' '}
              <Button
                variant='outline-success'
                onClick={() => this.playDealerHand()}
                disabled={!this.state.handDealt || this.state.playerStand}>
                Stand
              </Button>{' '}
              <Button
                variant='outline-warning'
                onClick={() => this.hit()}
                disabled={!this.state.handDealt || this.state.playerStand}>
                Hit
              </Button>{' '}
              <Button
                variant='outline-danger'
                onClick={() => this.resetHand()}
                disabled={!this.state.handDealt}>
                Clear Hand
              </Button>{' '}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
