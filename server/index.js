<<<<<<< HEAD
 //import React from 'react';
 //import ReactDOM from 'react-dom';
//const React = require('react');
//const ReactDOM = require('react-dom');
const faces = require('cool-ascii-faces').faces;

// class Test extends React.Component {
//   render() {
//     return <h1>Hello World!</h1>;
//   }
// }

//ReactDOM.render(<Test />, document.getElementById('root'));

=======
const faces = require('cool-ascii-faces').faces;

>>>>>>> f2d26758f926299454273a8ca87d67c9c57f18a4
function getRandomString () {
    return (Math.random()).toString(36).substr(2);
}

function getRandomInRange (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


module.exports = () => {
    const data = { products: [] },
        facesLen = faces.length;

    // Create 500 products
    for (let i = 0; i < 500; i++) {
        data.products.push({
            id: getRandomInRange(0, 100000) + '-' + getRandomString(),
            size: getRandomInRange(12, 40),
            price: getRandomInRange(1, 1000),
            face: faces[i % facesLen],
            date: new Date(Date.now() - getRandomInRange(1, 1000 * 3600 * 24 * 15)).toString()
        });
    }

    return data;
}
