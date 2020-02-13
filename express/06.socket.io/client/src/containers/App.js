import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import socket from '../conf/socket';
import Header from './Header';
import Agenda from './Agenda/';
import Results from './Results/';
import NewAgenda from './Agenda/NewAgenda';
import EditAgenda from './Agenda/EditAgenda';
import Poll from './Poll';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Agenda} />
            <Route path="/agenda" component={Agenda} />
            <Route path="/agendas/new" component={NewAgenda} />
            <Route path="/results" component={Results} />
            <Route path="/poll" component={Poll} />
            <Route path="/agendas/:id/edit" component={EditAgenda} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
