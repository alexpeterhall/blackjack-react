import React from 'react';
import Card from './Card/Card';

const cards = (props) => {
  return props.hand.map((card) => (
    <Card card={card} key={Math.floor(Math.random() * 1000000)} />
  ));
};

export default cards;
