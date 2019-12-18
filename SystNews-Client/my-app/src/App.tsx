import React from 'react';
//import {BrowserRouter as Router, Route} from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";

import home from './home';
import publish from './publish';
import State from './State';

function App() {
  return (
    <Router>
        <React.Fragment>
          <State>
            <Route exact path = "/" component = {home}

            />
            <Route exact path = "/home" component = {home}

            />
            <Route path = "/1" component = {home}

            />
            <Route path = "/2" component = {home}

            />
            <Route path = "/3" component = {home}

            />
            <Route path = "/4" component = {home}
            
            />
            <Route path = "/publish" component = {publish} 

            />

            <Route path="/category/:1/:id" component = {home}/>
            <Route path="/category/:2/:id" component = {home}/>
            <Route path="/category/:3/:id" component = {home}/>
          </State>
        </React.Fragment>
    </Router>
    
  );
}

export default App;