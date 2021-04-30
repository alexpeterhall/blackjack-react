import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Account from './Account/Account';

const Bank = (props) => {
  // TODO Implement Betting / Bank
  let dealerBalance = 500;
  let playerBalance = 500;
  return (
    <Row lg={8}>
      <Col>
        <Account holder='Dealer' balance={dealerBalance} />
      </Col>
      <Col>
        <Account holder='Player' balance={playerBalance} />
      </Col>
    </Row>
  );
};

export default Bank;
