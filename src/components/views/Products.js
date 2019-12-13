import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Axios from 'axios';
import '../css/products.css';

const MILLIS_PER_DAY = 24 * 3600 * 1000;
const DAYS = ["Today", "One", "Two", "Three", "Four", "Five", "Six"];

class Products extends Component {
  state = {
    products: null,
    nextBatch: null,
    lastPage: 1,
    pages: []
  } 
  constructor(props) {
    super(props);
    this._prevOffsetBottom = 1;
  }
  _getDate = (str) => {
     const date = new Date(str);
     const now = new Date();
     const days = parseInt((now.getTime() - date.getTime())/MILLIS_PER_DAY);
     if (days < 7) return `${DAYS[days]} ${days > 1 ? " days ago" : days === 1 ? "day ago" : ""}`;
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
  _handleScroll = (start) => {
    if (document.querySelector(".products-container") === null) return;
    const el = document.querySelector(".products-container").lastChild;
    if (el === null) return;
    const rect = el.previousSibling.getBoundingClientRect();
    const ht = document.documentElement.clientHeight;
    const offsetTop = ht - rect.y;
    const offsetBottom = ht - rect.y - rect.height;
    console.log(offsetBottom + "  " + this._prevOffsetBottom + "   " + this.state.lastPage);
    //if (this.state.page === this.state.lastPage*4) offsetBottom -= 360;
    if (offsetBottom >= 0 && this._prevOffsetBottom < 0 || start && offsetBottom > 0) {
      //add one row
      Axios.get(`http://localhost:3001/products/?_page=${this.state.lastPage}&_limit=4`).then((response) => {
      if (!response) return;
      var products = this.state.products;
      if (products === null) products = [];      
      var len = response.data.length;
      for (let i = 0; i < len; i++) {
        products.push(response.data[i]);
      }
      len = products.length;
      var pages = [];
      for (let i = 0; i < len; i = i + 20) {
        pages.push(i);
      }
      this.setState({products: products, pages: pages, lastPage: this.state.lastPage + 1 });
    });
    } else if (offsetBottom <= 0 && this._prevOffsetBottom >= 0 && this.state.lastPage > 1) {
      // var products = this.state.products;
      // if (products === null) return;      
      // var len = products.length;
      // for (let i = 0; i < len; i++) {
      //   products = products.slice(0, len - 5);
      // }
      // len = products.length;
      // var pages = [];
      // for (let i = 0; i < len; i = i + 20) {
      //   pages.push(i);
      // }
      // this.setState({products: products, pages: pages, lastPage: this.state.lastPage - 1 });
    }
    this._prevOffsetBottom = offsetBottom;
    // if (offsetTop < 0) {
    //   //remove bottom row
    // }
  }
  componentDidMount() {
    window.onscroll = this._handleScroll;
    Axios.get("http://localhost:3001/products/?_page=1&_limit=4").then((response) => {
      if (!response) return;
      const len = response.data.length;
      var pages = [];
      for (let i = 0; i < len; i = i + 20) {
        pages.push(i);
      }
      this.setState({products: response.data, pages: pages});
      //this._handleScroll(true);
    });
  }
  render() {
    return (
      <div>{ this.state.products != null &&
        this.state.pages.map((page, i) => 
          <div key={i} className="products-container">{this.state.products.slice(page, page + 20).map((item, index) =>
            <div onMouseOver={(e)=>console.log(e.currentTarget.getBoundingClientRect().y + 
              e.currentTarget.getBoundingClientRect().height - document.documentElement.clientHeight)} 
            key = {index} className="grid-item">
            <div className="item-header">
              <div className="product-price">${item.price}</div>
            </div>
            <div className="product-face">{item.face}</div>
            <div className="item-footer">
              <div>Size:</div>
              <div>{item.size}</div>
              <div>Posted:</div>
              <div>{this._getDate(item.date)}</div>
              <div>Id:</div>
              <div>{item.id}</div>
            </div>
          </div>)}
          <div className="ad">
            <img src={"/ads\/?r=" +  this._getNextAd()}/>
          </div>
        </div>
        )
      }</div>
    );
  }
}

export default Products;

