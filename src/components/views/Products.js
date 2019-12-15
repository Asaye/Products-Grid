import React, { Component } from 'react';
import { createBrowserHistory as history } from 'history';
import Axios from 'axios';
import Status from './Status';
import Page from './Page';
import '../css/products.css';

const NUM_COLUMNS = 4;

class Products extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      products: null,
      nextBatch: null,
      lastPage: 0,
      endOfCatalogue: false,
      pages: []
    }; 
    this._nextBatch = Axios.get(this._getUrl(1));
  }
  
  _addRow = () => {

    this._nextBatch.then((response) => {      
      var len = response.data.length;

      if (len === 0) {
        this.setState({ 
          endOfCatalogue: true, 
          isLoading: false 
        });
        return;
      }
      
      const lastPage = this.state.lastPage;
      
      var products = this.state.products;
      var pages = this.state.pages;
      var nPages = pages.length;

      if (products === null) products = []; 

      for (let i = 0; i < len; i++) {
        products.push(response.data[i]);
      }     
          
      if (nPages === 0) {
        pages.push(0);
      } else if (products.length - pages[nPages - 1] >= 20) {
        for (let i = pages[nPages - 1]; i < products.length; i += 20) {
          pages.push(i + 20);
        }
      }

      history().push(this._getUrl(lastPage));
      this.setState({
        products: products, 
        pages: pages, 
        lastPage: lastPage + 1, 
        isLoading: false 
      });

    });
  }
  
  _getUrl = (page) => {
    const loc = history().location;
    var url = "/products" + loc.search;

    if (url.indexOf("_page") < 0) {
        if (loc.search === "") {
          url = url + `?_page=${page}&_limit=${NUM_COLUMNS}`;
        } else {
          url = url.replace(new RegExp("\\?"), `?_page=${page}&_limit=${NUM_COLUMNS}&`);
        }
    } else {
      url = url.replace(new RegExp("_page=(\\d)+"), `_page=${page}`);
    }

    return url;
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
    
    if (Math.abs(h1 -h2) < 2) {
      const time = 0; // change this value to see the functionality of 
                      // the animated "loading..." status indicator.
                      // Othewise the setTimeout function is unnecessary.
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

  componentDidUpdate(prevProps, prevState) {
    var page = this.state.lastPage;
    if (prevState.lastPage === page) return;

    const h1 = document.body.scrollHeight;
    const h2 = document.documentElement.clientHeight;

    this._nextBatch = Axios.get(this._getUrl(page + 1));
    if (h1 < h2) this._addRow();
  }

  render() {
    return (
      <div>
        { 
          this.state.products != null &&
          this.state.pages.map((page, i) => 
            <div key={i} style={{gridTemplateColumns: `repeat(${NUM_COLUMNS}, 1fr)`}} 
              className="products-container">
              <Page products={this.state.products.slice(page, page + 20)}/>
              { 
                (this.state.products.length - page) >= 20 &&
                <div className="ad">
                  <img alt="" src={"/ads/?r=" +  this._getNextAd()}/>
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

