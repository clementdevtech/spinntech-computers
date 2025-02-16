const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

class Chat extends Model {
  static get tableName() {
    return 'chats';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'message'],
      properties: {
        id: { type: 'string', maxLength: 50 },
        user_id: { type: 'string' },
        message: { type: 'string', maxLength: 1000 },
        response: { type: 'string', maxLength: 1000, nullable: true },
        status: { type: 'string', enum: ['unanswered', 'answered'], default: 'unanswered' },
        created_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  static get relationMappings() {
    const User = require('./User');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'chats.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = Chat;
