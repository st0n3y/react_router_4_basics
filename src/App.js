import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.css';

const loggedIn = true;

const Home = (props) => <h1>Home</h1>;

/* This function will be run every time links are rendered (i.e. route is changed) to determine if "contact" link qualifies for "active" class name. */
const isActive = (match, location) => {
  console.log(match, location);
  return match;
}

const Contact = ({match}) => (
  <div>
    <Route 
      path="/contact" 
      render={() => <h1>Contact</h1>} />
  </div>
)

const Links = () => (
  <nav>
    <NavLink exact activeClassName="active" to="/?123">Home</NavLink>
    <NavLink activeStyle={{color: "green"}} to={{pathname: "/about", search: "id=456"}}>About</NavLink>
    <NavLink 
      isActive={isActive} 
      activeClassName="active" 
      replace to="/contact/?789">Contact
    </NavLink>
    <NavLink to="/old">
      Old
    </NavLink>
    <NavLink to="/protected">Protected</NavLink>
  </nav>
)

const App = (props) => (
  <Router>
  <div>
    <Links />
    <Switch>
        <Route exact path="/" component={Home} />
        {/*<Route strict path="/about/" render={() => <h1>About</h1>} />*/}
        <Route 
          path="/about" 
          children={({match}) => match && <div><h1>About</h1><br /><p>{new URLSearchParams(location.search).get("id")}</p></div>}
           />

        <Contact />

        <Route path="/:page/:subpage" render={({match}) => (
          <h1>
            PAGE: {match.params.page || "Home"}<br />
            SUBPAGE: {match.params.subpage}
          </h1>
        )} />
      <Route render={() => <h1>Page not found</h1>} />
      
      <Route path="/old/:str" render={({match}) => (
        <Redirect to={`/new/${match.params.str}`} />  
      )} />

      <Route path="/protected" render={() => (
        loggedIn
        ? <h1>Welcome to the protected page</h1>
        : <Redirect to="/new/Login" />
      )} />
      
    </Switch>
  </div>
  </Router>
);

export default App;

/* Use question mark to make param optional and hyphen to avoid making subdirectory. 
<Route path="/:page-:subpage?" render={({match}) => (
  <h1>
    PAGE: {match.params.page || 'Home'}<br />
    SUBPAGE: {match.params.subpage}
  </h1>
)} />
*/
/* Use regular expressions to more precisely validate route parameters. e.g. \d+ for any number of digits, \d{2}-\d{2}-\d{4} for date format, \[a-z]+ for any number of alpha characters.
<Route path="/:a(\d+)/:b" render={({match}) => (
  <h1>
    PAGE: {match.params.a}<br />
    SUBPAGE: {match.params.b}
  </h1>
)} />
*/