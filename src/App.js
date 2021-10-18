import React from 'react';
import {
    HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Arp from './apps/arp';
import Harmoniser from './apps/harmoniser';

const App = () => {
  return (
    <Router>

    <Switch>
      <Route
        exact 
        path="/"
        component={Arp}
      />
      <Route
        path="/arp"
        component={Arp}
      />
      <Route
        path="/harmoniser"
        component={Harmoniser}
      />
    </Switch>
    </Router>
  );
};

export default App;
