Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function(){
      return Tasks.find({});
    }
  });

  Template.body.events({
    "submit .add-todos": function(event){    //submitting the form
      var userInput = event.target.value;         //create text variable to hold user's input

      Tasks.insert({                         //insert tasks into mongo
        text: userInput,
        createdAt: new Date()
      });
      event.target.text.value = "";          //clear the form

      return false;                          //prevent default form submit
    }
  });
}