const { Model } = require("objection");
const knex = require("../db");

Model.knex(knex);

class Order extends Model {
  static get tableName() {
    return "orders";
  }

  static get idColumn() {
    return "id";
  }

  static async findAll() {
    return knex("orders").select("*");
  }

  static async findById(orderId) {
    return knex("orders").where("id", orderId).first();
  }

  static async create({ userId, totalAmount, status }) {
    return knex("orders").insert({ user_id: userId, total_amount: totalAmount, status }).returning("*");
  }
}

module.exports = Order;
