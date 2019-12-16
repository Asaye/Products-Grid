import React, { Component } from 'react';
import '../css/products.css';

const MILLIS_PER_DAY = 24 * 3600 * 1000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

class Page extends Component {

  _getDate = (str) => {
     const date = new Date(str);
     const now = new Date();
     const nDays = parseInt((now.getTime() - date.getTime())/MILLIS_PER_DAY, 10);
     if (nDays === 0) return "Today";
     else if (nDays < 7) return `${nDays} day${nDays > 1 ? "s" : ""} ago`;
     else return `${MONTHS[date.getMonth()]}. ${date.getDate()}, ${date.getFullYear()}`
  }
  
  render() {
    const products = this.props.products;

    return products.map((item, index) => {
      return (
        <div key={index} className="grid-item">
          <div className="item-header">
            <div className="product-price">${item.price}</div>
          </div>
          <div className="product-face">{item.face}</div>
          <div className="item-footer">
            <div>Size:</div>
            <div>{item.size}px</div>
            <div>Posted:</div>
            <div>{this._getDate(item.date)}</div>
            <div>Id:</div>
            <div>{item.id}</div>
          </div>
        </div>
      )
    });
  }
}

export default Page;

