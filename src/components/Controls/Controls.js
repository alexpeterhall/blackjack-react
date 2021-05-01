import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const Controls = (props) => {
  const buttonStyle = { margin: '10px 10px 0 0' };
  return (
    <Row style={{ padding: '20px 0 0 0' }}>
      <Col lg={{ span: 6, offset: 3 }}>
        <Button
          style={buttonStyle}
          size='lg'
          variant={props.handDealt || props.currentPot <= 0 ? 'outline-primary' : 'primary'}
          onClick={props.deal}
          disabled={props.handDealt || props.currentPot <= 0}>
          Deal Hand
        </Button>
        <Button
          style={buttonStyle}
          size='lg'
          variant={!props.handDealt || props.playerStand ? 'outline-warning' : 'warning'}
          onClick={props.hit}
          disabled={!props.handDealt || props.playerStand}>
          Hit
        </Button>
        <Button
          style={buttonStyle}
          size='lg'
          variant={!props.handDealt || props.playerStand ? 'outline-success' : 'success'}
          onClick={props.playDealer}
          disabled={!props.handDealt || props.playerStand}>
          Stand
        </Button>
        <Button
          style={buttonStyle}
          size='lg'
          variant={props.dealerHidden ? 'outline-danger' : 'danger'}
          onClick={props.reset}
          disabled={props.dealerHidden}>
          Clear Hand
        </Button>
      </Col>
    </Row>
  );
};

export default Controls;
