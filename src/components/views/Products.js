import React, { Component } from 'react';
import { createBrowserHistory as history } from 'history';
import Axios from 'axios';
import Status from './Status';
import '../css/products.css';

const MILLIS_PER_DAY = 24 * 3600 * 1000;
const DAYS = ["Today", "One", "Two", "Three", "Four", "Five", "Six"];
const NUM_COLUMNS = 5;

class Products extends Component {
  state = {
    products: null,
    nextBatch: null,
    lastPage: 0,
    endOfCatalogue: false,
    pages: []
  } 
  constructor(props) {
    super(props);
    this._nextBatch = null;
  }
  _getDate = (str) => {
     const date = new Date(str);
     const now = new Date();
     const days = parseInt((now.getTime() - date.getTime())/MILLIS_PER_DAY);
     if (days < 7) return `${DAYS[days]} ${days > 1 ? " days ago" : days === 1 ? "day ago" : ""}`;
     else return `${date.getMonth() + 1}-${date.getDate() < 10 ? ("0"+date.getDate()) : date.getDate() }-${date.getFullYear()}`
  }
  _addRow = () => {
    if (this._nextBatch === null && this.state.products !== null) {
      this.setState({ endOfCatalogue: true, isLoading: false });
    }

    if (this._nextBatch === null) {
      this._getNextBatch();
      return;
    }
    
    var products = this.state.products;
    if (products === null) products = [];      
      var len = this._nextBatch.length;
      for (let i = 0; i < len; i++) {
        products.push(this._nextBatch[i]);
      }
      var pages = this.state.pages;
      len = pages.length;
      if (len === 0) {
        pages.push(0);
        history().push(`/products/?_page=1&_limit=20`);
      } else if (products.length - pages[len - 1] >= 20) {
        pages.push(pages[len - 1] + 20);
      }
      this._getNextBatch();
      this.setState({products: products, pages: pages, lastPage: this.state.lastPage + 1, isLoading: false });
  }
  _getNextBatch = () => {
    Axios.get(`http://localhost:3001/products/?_page=${this.state.lastPage + 1}&_limit=${NUM_COLUMNS}`).then((response) => {
      if (!response || !response.data) return;
      if (response.data.length === 0) {
        this._nextBatch = null;
        return;
      }
      this._nextBatch = [];      
      var len = response.data.length;
      for (let i = 0; i < len; i++) {
        this._nextBatch.push(response.data[i]);
      }
      if (this.state.products === null) {
        this._addRow();
      }
    });
  }
  _getProduct = (props) => {
    const page = props.page;
    return this.state.products.slice(page, page + 20).map((item, index) => {
      return (
        <div key={index} className="grid-item">
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
        </div>
      )
    });
  }
  _getNextAd = () => {
      var nextAd = Math.floor(Math.random()*1000);
      while (nextAd === this._prevAd) {
         nextAd = Math.floor(Math.random()*1000);
      }
      this._prevAd = nextAd;
      return nextAd;
  }
  _handleScroll = (e) => {
    const h1 = document.documentElement.scrollHeight;
    const h2 = e.pageY + document.documentElement.clientHeight;
    const ads = document.querySelectorAll(".ad");
    var page = 1;
    for (let i = 0; i < ads.length; i++) {
      if ((ads[i].getBoundingClientRect().bottom) < 0) {
        page = i + 2;
      }
    }
    history().push(`/products/?_page=${page}&_limit=20`);
    if (Math.abs(h1 -h2) < 2) {
      const time = 0; // change this value to see the functionality of the animated "loading..." status indicator.
      this.setState({ isLoading: true });
      setTimeout(() => { 
        this._addRow();
      }, time);
    }
  }
  componentDidMount() {
    window.onscroll = this._handleScroll;
    this._addRow();
  }
  componentDidUpdate() {
    const h1 = document.body.scrollHeight;
    const h2 = document.documentElement.clientHeight;
    if (h1 < h2) this._addRow();
  }
  render() {
    return (
      <div id = "prodCont">
        { 
          this.state.products != null &&
          this.state.pages.map((page, i) => 
            <div key={i} style={{gridTemplateColumns: `repeat(${NUM_COLUMNS}, 1fr)`}} 
                className="products-container">
                <this._getProduct page={page}/>
                { 
                  (this.state.products.length - page) >= 20 &&
                    <div className="ad" id={page/20 + 1}>
                      <img src={"/ads/?r=" +  this._getNextAd()}/>
                    </div>
                }
            </div>
          )
        }
        {
          this.state.isLoading && <Status />
        }
        {
          this.state.endOfCatalogue &&
          <div className="end-of-catalogue">
            ~ end of catalogue ~
          </div>
        }
      </div>
    );
  }
}

export default Products;

