import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Scores = (props) => {
  return (
    <Row lg={8}>
      <Col>
        <h3>Score: {props.dealerHidden ? '?' : props.dealerScore}</h3>
      </Col>
      <Col>
        <h3>Score: {props.playerScore}</h3>
      </Col>
    </Row>
  );
};

export default Scores;
