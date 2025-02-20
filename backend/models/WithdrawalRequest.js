const { Model } = require("objection");
const knex = require("../db");

Model.knex(knex);

class WithdrawalRequest extends Model {
  static get tableName() {
    return "withdrawal_requests";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "amount", "status"],
      properties: {
        id: { type: "integer" },
        user_id: { type: "string", maxLength: 50 },
        amount: { type: "number", minimum: 0 },
        status: { type: "string", enum: ["pending", "approved", "rejected"] },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }
}

module.exports = WithdrawalRequest;
