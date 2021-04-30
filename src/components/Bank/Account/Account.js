import React from 'react';

const Account = (props) => {
  return (
    <div className='Bank'>
      <h3>
        {props.holder} Bank: ${props.balance}
      </h3>
    </div>
  );
};

export default Account;
