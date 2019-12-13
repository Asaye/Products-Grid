import React, { Component } from 'react';
import querystring from 'querystring';
import '../css/sort.css';

const SORT_PARAMS = ["id", "price", "size"];

class Sort extends Component {
  state = {
    sortBy: "",
    showOptions: false
  }

  _sortBy = (type) => {
    window.location.href = "/products?_sort=" + type;
    this.setState({ sortBy: type, showOptions: false });
  }

  componentDidMount() {
    const search = window.location.search;
    const type = querystring.parse(search)["?_sort"];
    if (type !== undefined) {
      this.setState({ sortBy: type });
    } 
  }

  render() {
    return (
      <div className="sort-container">
        <span className="sort-label"> Sort by </span>
        { 
          !this.state.showOptions &&
          <div className="sort-selected">
            <a type="text">{this.state.sortBy}</a>
            <a onClick={()=>this.setState({ showOptions: true })} 
               className="caret-down"> &#x25BC; </a>
          </div>
        }
        { 
          this.state.showOptions &&
          <div onMouseLeave={()=>this.setState({ showOptions: false })} 
               className="sort-list"> 
          	<ul className="sort-items">
            {
              SORT_PARAMS.map((item, index) => 
                <li key={index}>
                  <a onClick={() => this._sortBy(item)}>
                    <span>{item}</span>
                  </a>
                </li>
              )
            }
          	</ul>
          </div>
        }
      </div>
    );
  }
}

export default Sort;

