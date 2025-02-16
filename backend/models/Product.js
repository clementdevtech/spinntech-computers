const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

class Product extends Model {
  static get tableName() {
    return 'products';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'price', 'description'],
      properties: {
        id: { type: 'string', maxLength: 50 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', maxLength: 1000 },
        price: { type: 'number', minimum: 0 },
        stock: { type: 'integer', minimum: 0, default: 0 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  static get relationMappings() {
    const Review = require('./Review');
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: 'products.id',
          to: 'reviews.product_id'
        }
      }
    };
  }
}

module.exports = Product;
