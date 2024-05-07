import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The AllCardsCollection. It encapsulates state and variable values for stuff.
 */
class AllCardsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'AllCardsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      course: String,
      power: Number,
      type: {
        type: String,
        allowedValues: ['Common', 'Rare', 'Legendary'],
      },
      role: {
        type: String,
        allowedValues: ['Professor', 'Instructor'],
      },
      title: String,
      description: String,
      funFact: String,
      cardName: String,
      image: String,
      owner: String,
      isListedForTrade: {
        type: String,
        defaultValue: 'No',
        allowedValues: ['No', 'Yes'],
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.userTradePublicationName = `${this.name}.publication.trade`; // Rename the publication name for trade cards
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the AllCardsCollection.
 * @type {AllCardsCollection}
 */
export const AllCards = new AllCardsCollection();
