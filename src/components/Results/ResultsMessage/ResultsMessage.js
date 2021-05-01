import React from 'react';
import './ResultsMessage.css';
import { Row, Col } from 'react-bootstrap';

const Message = (props) => {
  let playerResult = null;
  let dealerResult = null;
  let playerStyle = null;
  let dealerStyle = null;
  if (props.playerBusted === true) {
    playerResult = 'Player Busted!';
    dealerResult = 'Dealer Won!';
    playerStyle = 'Loser';
    dealerStyle = 'Winner';
  } else if (props.dealerBusted === true) {
    playerResult = 'Player Won!';
    dealerResult = 'Dealer Busted!';
    playerStyle = 'Winner';
    dealerStyle = 'Loser';
  } else if (props.result === 'tied') {
    playerResult = "It's a Draw!";
    dealerResult = "It's a Draw!";
    playerStyle = 'Tied';
    dealerStyle = 'Tied';
  } else if (props.result === 'player') {
    playerResult = 'Player Won!';
    dealerResult = 'Dealer Lost!';
    playerStyle = 'Winner';
    dealerStyle = 'Loser';
  } else if (props.result === 'dealer') {
    playerResult = 'Player Lost!';
    dealerResult = 'Dealer Won!';
    playerStyle = 'Loser';
    dealerStyle = 'Winner';
  } else {
    playerResult = '.';
    dealerResult = '.';
    playerStyle = 'Hidden';
    dealerStyle = 'Hidden';
  }
  return (
    <Row lg={8}>
      <Col className={dealerStyle}> {dealerResult} </Col>
      <Col className={playerStyle}> {playerResult} </Col>
    </Row>
  );
};

export default Message;
