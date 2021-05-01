import React, { Fragment } from 'react';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

const Bank = (props) => {
  const style = { padding: '30px 0 0 0' };
  return (
    <Fragment>
      <Row lg={{ span: 4, offset: 4 }} style={style}>
        <Col>
          <h2>Player Bank: ${props.playerBank}</h2>
          <h2>Pot: ${props.currentPot}</h2>
        </Col>
      </Row>
      <Row style={style}>
        <Col lg={{ span: 4, offset: 4 }}>
          <InputGroup size='lg'>
            <InputGroup.Prepend>
              <Button
                variant={
                  !props.isValid || props.currentPot > 0 || props.handDealt
                    ? 'outline-success'
                    : 'success'
                }
                onClick={props.submitBet}
                disabled={!props.isValid || props.currentPot > 0 || props.handDealt}>
                Place Bet
              </Button>
            </InputGroup.Prepend>
            <FormControl
              placeholder='You must place a bet...'
              aria-label='Bet Amount'
              value={props.betInput}
              onChange={(event) => props.inputChangedHandler(event)}
            />
          </InputGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Bank;
