import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const Controls = (props) => {
  return (
    <Row style={{ padding: '30px 0 0 0' }}>
      <Col lg={{ span: 6, offset: 3 }}>
        <Button variant='outline-success' disabled>
          Place Bet
        </Button>{' '}
        <Button variant='outline-primary' onClick={props.deal} disabled={props.handDealt}>
          Deal Hand
        </Button>{' '}
        <Button
          variant='outline-success'
          onClick={props.playDealer}
          disabled={!props.handDealt || props.playerStand}>
          Stand
        </Button>{' '}
        <Button
          variant='outline-warning'
          onClick={props.hit}
          disabled={!props.handDealt || props.playerStand}>
          Hit
        </Button>{' '}
        <Button variant='outline-danger' onClick={props.reset} disabled={!props.handDealt}>
          Clear Hand
        </Button>{' '}
      </Col>
    </Row>
  );
};

export default Controls;
