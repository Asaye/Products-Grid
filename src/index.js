import React from 'react';
import ReactDOM from 'react-dom';
import Sort from './components/views/Sort';
import Products from './components/views/Products';
import Status from './components/views/Status';

ReactDOM.render(<Sort />, document.getElementById('sort'));
ReactDOM.render(<Products />, document.getElementById('products'));
ReactDOM.render(<Status />, document.getElementById('loading'));
