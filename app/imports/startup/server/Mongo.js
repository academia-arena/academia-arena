import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { TCards } from '../../api/tcard/TCard.js';
import { AllCards } from '../../api/allcard/AllCard.js';
import { WishlistCard } from '../../api/wishcard/WishlistCard.js';
import { CatalogCard } from '../../api/cardcatalog/CatalogCard';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

const addTCard = (tcard) => {
  console.log(`  Adding: ${tcard.lastName} (${tcard.owner}) `);
  TCards.collection.insert(tcard);
};

if (TCards.collection.find().count() === 0) {
  if (Meteor.settings.defaultCards) {
    console.log('Creating default cards.');
    Meteor.settings.defaultCards.forEach(tcard => addTCard(tcard));
  }
}

const addAllCard = (allcard) => {
  console.log(`  Adding: ${allcard.lastName} (${allcard.owner}) `);
  AllCards.collection.insert(allcard);
};

if (AllCards.collection.find().count() === 0) {
  if (Meteor.settings.allCards) {
    console.log('Creating all cards.');
    Meteor.settings.allCards.forEach(allcard => addAllCard(allcard));
  }
}

const addCatalogCard = (cardcatalog) => {
  console.log(`  Adding: ${cardcatalog.lastName} (${cardcatalog.owner}) `);
  CatalogCard.collection.insert(cardcatalog);
};

if (CatalogCard.collection.find().count() === 0) {
  if (Meteor.settings.allCards) {
    console.log('Creating allCards cards.');
    Meteor.settings.allCards.forEach(cardcatalog => addCatalogCard(cardcatalog));
  }
}

if (WishlistCard.collection.find().count() === 0) {
  console.log('Initializing Wishlist collection.');
  // You can optionally add default wishlist items here if needed.
}
