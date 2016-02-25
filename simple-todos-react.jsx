Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Meteor.startup(function() {
    ReactDOM.render(<App />, document.getElementById('container'));
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
