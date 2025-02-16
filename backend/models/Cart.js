const db = require("../config/db");

class Cart {
    static async addItem(userId, productId, quantity) {
        const [cartItem] = await db("cart")
            .insert({ user_id: userId, product_id: productId, quantity })
            .returning("*");
        return cartItem;
    }

    static async getByUserId(userId) {
        return db("cart").where({ user_id: userId }).select("*");
    }

    static async removeItem(userId, productId) {
        return db("cart").where({ user_id: userId, product_id: productId }).del();
    }
}

module.exports = Cart;
