import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function () {
  return Meteor.users.find({}, { fields: { services: 0 } });
});
