const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

class Review extends Model {
  static get tableName() {
    return 'reviews';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'product_id', 'rating', 'comment'],
      properties: {
        id: { type: 'string', maxLength: 50 },
        user_id: { type: 'string' },
        product_id: { type: 'string' },
        rating: { type: 'integer', minimum: 1, maximum: 5 },
        comment: { type: 'string', maxLength: 1000 },
        created_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  static get relationMappings() {
    const User = require('./User');
    const Product = require('./Product');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'reviews.user_id',
          to: 'users.id'
        }
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'reviews.product_id',
          to: 'products.id'
        }
      }
    };
  }
}

module.exports = Review;
