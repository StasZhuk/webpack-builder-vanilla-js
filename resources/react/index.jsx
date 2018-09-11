import React from 'react';
import { hot } from 'react-hot-loader';

const Test = () => {
  return <div>
    <img src={require('images/webstorm1.svg')} alt=""/>
  </div>
};

export default hot(module)(Test);