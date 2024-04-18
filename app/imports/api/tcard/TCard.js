import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class TCardsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'TCardsCollection';
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
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the TCardsCollection.
 * @type {TCardsCollection}
 */
export const TCards = new TCardsCollection();
