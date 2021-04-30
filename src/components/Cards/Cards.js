import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from './Card/Card';

const Cards = (props) => {
  return (
    <Row lg={8} style={{ padding: '0 0 20px 0' }}>
      <Col>
        {props.dealerHand.map((card) => (
          <Card card={card} key={Math.floor(Math.random() * 1000000)} />
        ))}
      </Col>
      <Col>
        {props.playerHand.map((card) => (
          <Card card={card} key={Math.floor(Math.random() * 1000000)} />
        ))}
      </Col>
    </Row>
  );
};

export default Cards;
