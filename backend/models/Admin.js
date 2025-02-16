const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

class Admin extends Model {
  static get tableName() {
    return 'admins';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'name', 'email', 'password'],
      properties: {
        id: { type: 'string', maxLength: 50 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        role: { type: 'string', enum: ['admin', 'superadmin'], default: 'admin' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }
}

module.exports = Admin;
