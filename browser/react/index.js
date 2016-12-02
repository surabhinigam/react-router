import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import { Router, Route, hashHistory } from 'react-router';


ReactDOM.render(
  <Router history={hashHistory}>
  <Route path='/' component={AppContainer}>
    <Route path='/albums' component={Albums} /> 
  </Route>
</Router>,

  document.getElementById('app')
);
