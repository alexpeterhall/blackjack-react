import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Scores = (props) => {
  return (
    <Row lg={8}>
      <Col>
        <h2>Dealer Hand: {props.dealerHidden ? '🤷' : props.dealerScore}</h2>
      </Col>
      <Col>
        <h2>Player Hand: {props.playerScore}</h2>
      </Col>
    </Row>
  );
};

export default Scores;
