import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { TCards } from '../../api/tcard/TCard';
import { AllCards } from '../../api/allcard/AllCard';
import { WishlistCard } from '../../api/wishcard/WishlistCard';
import { CatalogCard } from '../../api/cardcatalog/CatalogCard';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// Publish trade cards to all users
Meteor.publish(TCards.userTradePublicationName, function () {
  return TCards.collection.find({ isListedForTrade: 'Yes' });
});

// Publish personal cards to their respective owners
Meteor.publish(TCards.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return TCards.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(AllCards.userAllPublicationName, function () {
  return AllCards.collection.find();
});

Meteor.publish(AllCards.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return AllCards.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(TCards.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return TCards.collection.find();
  }
  return this.ready();
});

Meteor.publish(AllCards.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return AllCards.collection.find();
  }
  return this.ready();
});

Meteor.publish(WishlistCard.userPublicationName, function () {
  return WishlistCard.collection.find();
});

Meteor.publish(WishlistCard.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return WishlistCard.collection.find();

  }
  return this.ready();
});
// Publish all cards to Card Catalog
Meteor.publish(CatalogCard.userPublicationName, function () {
  return CatalogCard.collection.find();
});

Meteor.publish(CatalogCard.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return CatalogCard.collection.find();

  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
