import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import BookDetail from './pages/BookDetail';
import BookList from './pages/BookList';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/list">
          <BookList />
        </Route>
        <Route path="/detail">
          <BookDetail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
