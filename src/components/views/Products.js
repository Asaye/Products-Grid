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
      <div className="Container">{ this.state.products != null &&
        this.state.pages.map((page, i) => 
          <div>{this.state.products.slice(page, page + 5).map((item, index) =>
            <div key = {index} className="Grid-item">
            <div className="Item-header">
              <div className="Product-price">${item.price}</div>
            </div>
            <div className="Product-face">{item.face}</div>
            <div className="Item-footer">
              <div className="Product-id">
                <span className="Product-labels">id: </span>{item.id}
              </div>
              <div className="Product-size">
                <span className="Product-labels">size: </span>{item.size}
              </div>
              <div className="Product-date">{this._getDate(item.date)}</div>
            </div>
          </div>)}
          <div className="Ad">Ad</div></div>
        )
        // this.state.products.map((item, index) => 
        //   <div><div key = {index} className="Grid-item">
        //     <div className="Item-header">
        //       <div className="Product-price">${item.price}</div>
        //     </div>
        //     <div className="Product-face">{item.face}</div>
        //     <div className="Item-footer">
        //       <div className="Product-id">
        //         <span className="Product-labels">id: </span>{item.id}
        //       </div>
        //       <div className="Product-size">
        //         <span className="Product-labels">size: </span>{item.size}
        //       </div>
        //       <div className="Product-date">{this._getDate(item.date)}</div>
        //     </div>
        //   </div>
        //   {(index+1)%20 === 0 && <div className="Ad"></div>}</div>)
      }</div>
    );
  }
}

export default Products;

