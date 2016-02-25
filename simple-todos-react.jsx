Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

  Meteor.subscribe('tasks');

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
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.remove(taskId);
  },

  setChecked(taskId, setChecked){
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, {
      $set: {checked: setChecked}
    });
  },

  setPrivate(taskId, setToPrivate) {
    const task = Tasks.findOne(taskId);

    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, {$set: {private: setToPrivate} });
  }


});

if (Meteor.isServer) {
  Meteor.publish('tasks', function(){
    return Tasks.find({
      // Note: Only publish tasks that are public or belong to the current user
      $or: [
        { private : {$ne: true}},
        {owner: this.userId}
      ]
    });
  });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
