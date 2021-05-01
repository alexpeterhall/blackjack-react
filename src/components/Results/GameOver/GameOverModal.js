import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const GameOverModal = (props) => {
  return (
    <Modal {...props} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title>Game Over!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You have run out of money! Close this message to start over.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameOverModal;
