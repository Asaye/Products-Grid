import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Axios from 'axios';
import '../css/products.css';

const MILLIS_PER_DAY = 24 * 3600 * 1000;

class Products extends Component {
  state = {
    products: null,
  }  

  constructor(props) {
    super(props);
  }
  _getDate = (str) => {
     const date = new Date(str);
     const now = new Date();
     const days = parseInt((now.getTime() - date.getTime())/MILLIS_PER_DAY);
     if (days === 0) return "Today";
     else if (days === 1) return `${days} day ago`;
     else if (days < 7) return `${days} days ago`;
     else return `${date.getMonth() + 1}-${date.getDate() < 10 ? ("0"+date.getDate()) : date.getDate() }-${date.getFullYear()}`
  }
  componentDidMount() {
    Axios.get("http://localhost:3001/products").then((response) => {
      this.setState({products: response.data});
    });
  }
  render() {
    return (
      <div className="Container">{ this.state.products != null &&
        this.state.products.map((item, index) => 
          <div key = {index} className="Grid-item">
            <div className="Item-header">
              <div className="Product-id">{item.id}</div>
              <div className="Product-price">{item.price}</div>
            </div>
            <div className="Product-face">{item.face}</div>
            <div className="Item-footer">
              <div className="Product-size">{item.size}</div>
              <div className="Product-date">{this._getDate(item.date)}</div>
            </div>
          </div>)
      }</div>
    );
  }
}

export default Products;

