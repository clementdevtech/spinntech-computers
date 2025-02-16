const db = require("../config/db");

class Order {
    static async create({ userId, totalAmount }) {
        const [order] = await db("orders")
            .insert({ user_id: userId, total_amount: totalAmount })
            .returning("*");
        return order;
    }

    static async findByUserId(userId) {
        return db("orders").where({ user_id: userId }).select("*");
    }

    static async findAll() {
        return db("orders").select("*");
    }
}

module.exports = Order;
