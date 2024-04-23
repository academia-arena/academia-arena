import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class WishlistCardCollection {
  constructor() {
    // The name of this collection.
    this.name = 'WishlistCardCollection';
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
      inWishlist: {
        type: Boolean,
        defaultValue: true,
      },
    });
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  addCard(cardData) {
    const existingCard = this.collection.findOne({ _id: cardData._id });

    if (existingCard) {
      console.log('Card already exists in the wishlist:', existingCard);

    } else {
      const cardWithWishlistField = { ...cardData, inWishlist: true };
      this.collection.insert(cardWithWishlistField);
    }
  }
}

/**
 * The singleton instance of the TCardsCollection.
 * @type {WishlistCardCollection}
 */
export const WishlistCard = new WishlistCardCollection();
