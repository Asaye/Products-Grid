# Products-Grid
This is an ecommerce site, where you can buy all sorts of ascii faces.

# Instructions
To run the code and to see the results in the browser, just double click the "start-react.bat" file
in the project directory. Starting the server and launching a browser to display the products will be
handled authomatically. This is equivalent to:
    1. open two terminals
    2. change the directory on both terminals to the current directory
    3. run "npm start" on the first terminal
    4  run "json-server --watch server/index.js --port 3001 --routes server/routes.json --middlewares server/handle-delay.js server/handle-ads.js" on the second.

# Handled features
- In this code assignment, all the specifications stated in the problem statement are met; namely,
   + the products are displayed in a grid (CSS grid layout with responsive number of columns is used)
   + sorting by "size", "price" or "id" can be made and the page reloads after the selection.
     (a dropdown menu with click events leading to a page reload is implemented)
   + relative dates are used if it is less than a week since the product is added and 
     absolute dates are used otherwise. (javascript date objects and their 'getTime()' function
     are used to calculate the number of days passed since the product was added relative to
     current date.)
   + scrolling down results in loading of more products till all the data is displayed.
     (a scroll event along with some calculations considering the moment at which the scrollbar 
      touches the base is used)
   + animated "loading..." status indicator is used to indicate that data is being loaded.
     (CSS is used for the animation)
   + whenever a new batch of products is loaded on the page, a pre-emptive request to fetch the
     next batch of products is sent and the result is kept as an unresolved promise. 
     (javascript promises along with Axios are used for this. The promises are resolved only when
      the user scrolls to the bottom of the page.)
   + whenever there are no more results to display, the "~ end of catalogue ~" message will be 
     displayed. (This state is assumed to happen when the response from the server for the next
     batch of products is an empty array.)
   + ads are displayed after every 20 products. No two similar ads will be displayed consecutively.
     (when a new random `?r` query param is generated it will be compared with the previous one and
      changed accordingly using a while loop.)

# Remaining features

- The ascii-faces are not of the same size. As a result, they take different sizes of the view port.
  To display all the faces fully, either the grid sizes should be different or the scale with which 
  they will be displayed should be different. This is not handled in this code assignment. But the 
  former option can be handle with CSS while the latter option can be handled with javaScript.
