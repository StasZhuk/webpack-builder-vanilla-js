import '../sass/main.scss';

import React from 'react';
import ReactDom from 'react-dom';

if(NODE_ENV === 'development') {
  require('../html/index.html');
}

import Test from './index.jsx';


ReactDom.render(<Test/>, document.getElementById('root'));