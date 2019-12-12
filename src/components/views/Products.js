import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Axios from 'axios';
import '../css/products.css';

const MILLIS_PER_DAY = 24 * 3600 * 1000;

class Products extends Component {
  state = {
    products: null,
    pages: []
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
  _getNextAd = () => {
      var nextAd = Math.floor(Math.random()*1000);
      while (nextAd === this._prevAd) {
         nextAd = Math.floor(Math.random()*1000);
      }
      this._prevAd = nextAd;
      return nextAd;
  }
  componentDidMount() {
    Axios.get("http://localhost:3001/products").then((response) => {
      if (!response) return;
      const len = response.data.length;
      var pages = [];
      for (let i = 0; i < len; i = i + 20) {
        pages.push(i);
      }
      this.setState({products: response.data, pages: pages});
    });
  }
  render() {
    console.log(this.state.pages);
    return (
      <div>{ this.state.products != null &&
        this.state.pages.map((page, i) => 
          <div className="Container">{this.state.products.slice(page, page + 20).map((item, index) =>
            <div key = {index} className="Grid-item">
            <div className="Item-header">
              <div className="Product-price">${item.price}</div>
            </div>
            <div className="Product-face">{item.face}</div>
            <div className="Item-footer">
              <div>Size:</div>
              <div>{item.size}</div>
              <div>Posted:</div>
              <div>{this._getDate(item.date)}</div>
              <div>Id:</div>
              <div>{item.id}</div>
            </div>
          </div>)}
          <div className="Ad">
            <img className="ad" src={"http://localhost:3001/ads/?r=" +  this._getNextAd()}/>
          </div>
        </div>
        )
      }</div>
    );
  }
}

export default Products;

