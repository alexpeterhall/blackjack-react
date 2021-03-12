import React from 'react';

class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='Bank'>
        <h3>Player Bank: $100</h3>
      </div>
    );
  }
}

export default Bank;
