import React from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  MemoryRouter,
  StaticRouter,
  Route,
  Link,
  Prompt
} from 'react-router-dom';

import './App.css';

const Home = () => (<h1>Home</h1>);

class Form extends React.component {
  state = {dirty: false}
  setDirty = () => this.setState({dirty: true})
  render() {
    return (
    <div>
      <h1>Form</h1>
      <input type="text" onInput={this.setDirty} />
    </div>
    <Prompt
      when={this.state.dirty}
      message="Data will be lost!"
    />
    )
  }
}

const App = () => (
  <Router>
    <div>
      <Link to="/">Home</Link>
      <Link to="/form">Form</Link>
      <Route exact path="/" component={Home} />
      <Route path="/form" component={Form} />
    </div>
  </Router>
);





const LinksRoutes = () => {
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Route exact path="/" render={() => <h1>Home</h1>} />
    <Route path="/about" render={() => <h1>About</h1>} />
  </div>
}

const forceRefresh = () => {
  console.log(new Date());
  return true;
}

const BrowserRouterApp = () => {
  <BrowserRouter forceRefresh={forceRefresh()}>
    <LinksRoutes />
  </BrowserRouter>
}

const HashRouterApp = () => {
  <HashRouter hashType="noslash">
    <LinksRoutes />
  </HashRouter>
}

/* Useful for testing, as it is not dependent on URL in browser. */
const MemoryRouterApp = () => {
  <MemoryRouter 
    initialEntries={["/", "/about"]}
    initialIndex={1}    
    >
    <LinksRoutes />
  </MemoryRouter>
}

/* For server-side rendering. */
const StaticRouterApp = () => {
  <StaticRouter location="/about" context={{}}>
    <LinksRoutes />
  </StaticRouter>
}