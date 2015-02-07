/** @jsx React.DOM */
var React = require('react');
var Route = require('react-router');
var RouteHandler = Route.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <h1>Hello, World!</h1>

        <RouteHandler />
      </div>
    )
  }
});

module.exports = App;