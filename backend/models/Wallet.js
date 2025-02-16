const db = require("../config/db");

class Wallet {
    static async create(userId) {
        return db("wallets").insert({ user_id: userId, balance: 0 }).returning("*");
    }

    static async getBalance(userId) {
        return db("wallets").where({ user_id: userId }).select("balance").first();
    }

    static async updateBalance(userId, amount) {
        return db("wallets").where({ user_id: userId }).increment("balance", amount);
    }

    static async deductBalance(userId, amount) {
        return db("wallets").where({ user_id: userId }).decrement("balance", amount);
    }
}

module.exports = Wallet;
