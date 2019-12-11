import React from 'react';
import ReactDOM from 'react-dom';
import '../css/sort.css';

const Sort = () => {
  return (
    <div className="Container">
      <span className="Sort-label"> Sort by        
      </span>
      <div className="Sort-list">
      	<ul className="Sort-items">
      		<li>id</li>
      		<li>price</li>
      		<li>size</li>
      	</ul>
      </div>
    </div>
  );
}

export default Sort;

