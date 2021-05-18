import React from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './container/Login';
import Chat from './container/Chat';

// import { Link } from 'react-router-dom';
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={['/', '/login']} component={Login} />
        <Route exact path='/chat' component={Chat} />
      </Switch>
    </HashRouter>
  );
}

export default App;