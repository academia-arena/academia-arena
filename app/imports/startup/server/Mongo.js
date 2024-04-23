import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { TCards } from '../../api/tcard/TCard.js';
import { Offers } from '../../api/trade/Offer';

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

const addOffers = (offer) => {
  console.log(`  Adding: ${offer.lastName} (${offer.owner}) `);
  Offers.collection.insert(offer);
};

if (Offers.collection.find().count() === 0) {
  if (Meteor.settings.defaultOffers) {
    console.log('Creating default cards.');
    Meteor.settings.defaultOffers.forEach(offer => addOffers(offer));
  }
}
