Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

  Meteor.startup(function() {
    ReactDOM.render(<App />, document.getElementById('container'));
  });
}

Meteor.methods({
  addTask(text) {
    if (!Meteor.userId()){
      throw new Meteor.Error('Not authorized');
    }

    Tasks.insert({
      text: text,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date() // current time
    });
  },

  removeTask(taskId){
    Tasks.remove(taskId);
  },

  setChecked(taskId, setChecked){
    Tasks.update(taskId, {
      $set: {checked: setChecked}
    });
  }

});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
