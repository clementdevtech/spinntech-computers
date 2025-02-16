const db = require("../config/db");

class Payment {
    static async create({ userId, orderId, amount, paymentMethod }) {
        const [payment] = await db("payments")
            .insert({ user_id: userId, order_id: orderId, amount, payment_method: paymentMethod })
            .returning("*");
        return payment;
    }

    static async findByUserId(userId) {
        return db("payments").where({ user_id: userId }).select("*");
    }

    static async findAll() {
        return db("payments").select("*");
    }
}

module.exports = Payment;
