Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function(){
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .add-todos": function(event){    //submitting the form
      var userInput = event.target.text.value;         //create text variable to hold user's input

      Tasks.insert({                         //insert tasks into mongo
        text: userInput,
        createdAt: new Date()
      });

      event.target.text.value = "";          //clear the form

      return false;                          //prevent default form submit
    }
  });

  Template.task.events({
    "click .toggle-checked": function(){
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function(){
      Tasks.remove(this._id);
    }
  });
}

//deploy using 'meteor deploy meteorJS-list.meteor.com'
//Browser: http://meteorJS-list.meteor.com