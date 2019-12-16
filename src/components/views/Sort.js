import React, { Component } from 'react';
import querystring from 'querystring';
import { createBrowserHistory as history } from 'history';
import '../css/sort.css';

const SORT_PARAMS = ["id", "price", "size"];

class Sort extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "",
      showOptions: false
    };
  }
  
  _sortBy = (type) => {
    const loc = history().location;
    var url = loc.pathname + loc.search;
    var delim = "?";

    if (url.indexOf("_sort=") === -1) {
        if (url.indexOf("?") >= 0) {
          delim = "&";
        }
        url = url + `${delim}_sort=${type}`;
    } else {
        url = url.replace(new RegExp("_sort=(id|price|size)"), `_sort=${type}`);
    }

    window.location.href = url;
    this.setState({ 
      sortBy: type, 
      showOptions: false 
    });
  }

  componentDidMount() {
    const search = window.location.search;
    if (search.indexOf("_sort") >= 0) {
      var val = querystring.parse(search);
      this.setState({ 
        sortBy: val["_sort"] || val["?_sort"] 
      });
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

