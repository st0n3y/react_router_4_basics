import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  NavLink 
} from 'react-router-dom';

import './App.css';

const Home = (props) => <h1>Home</h1>;

/* This function will be run every time links are rendered (i.e. route is changed) to determine if "contact" link qualifies for "active" class name. */
const isActive = (match, location) => {
  console.log(match, location);
  return match;
}

const Links = () => (
  <nav>
    <NavLink exact activeClassName="active" to="/">Home</NavLink>
    <NavLink activeStyle={{color: "green"}} to={{pathname: "/about"}}>About</NavLink>
    <NavLink 
      isActive={isActive} 
      activeClassName="active" 
      replace to="/contact">Contact</NavLink>
  </nav>
)

const App = (props) => (
  <Router>
  <div>
    <Links />
    <Route exact path="/" component={Home} />
    {/*<Route strict path="/about/" render={() => <h1>About</h1>} />*/}
    <Route 
      path="/about" 
      children={({match}) => match && <h1>About</h1>} />
    <Route path="/contact" render={() => <h1>Contact</h1>} />
    <Route path="/:page" render={({match}) => (
      <h1>
        PAGE: {match.params.page || 'Home'}
      </h1>
    )} />
  </div>
  </Router>
);

export default App;