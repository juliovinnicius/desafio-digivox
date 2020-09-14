import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DashPage from './pages/DashPage';
import BooksPage from './pages/BooksPage';
import ClientsPage from './pages/ClientsPage';

export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={DashPage} />
        <Route path="/books" component={BooksPage} />
        <Route path="/clients" component={ClientsPage} />
      </Switch>
    </BrowserRouter>
  );
}