import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class OffersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'OffersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      senderId: String,
      senderCardId: String,
      recipientId: String,
      offeredCardName: String,
      offeredCardImage: String,
      requestedCardId: String,
      message: String,
      status: {
        type: String,
        allowedValues: ['pending', 'accepted', 'rejected'],
        defaultValue: 'pending',
      },
      createdAt: Date,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the OffersCollection.
 * @type {OffersCollection}
 */
export const Offers = new OffersCollection();
