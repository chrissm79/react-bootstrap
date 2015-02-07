/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var App = require('./components/app');

var routes = (
  <Route name="app" path="/" handler={App}></Route>
);

module.exports = routes;