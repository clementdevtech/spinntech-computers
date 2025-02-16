const db = require("../config/db");

class User {
    static async create({ username, email, password, referralCode }) {
        const [user] = await db("users")
            .insert({ username, email, password, referral_code: referralCode })
            .returning("*");
        return user;
    }

    static async findByEmail(email) {
        return db("users").where({ email }).first();
    }

    static async findById(id) {
        return db("users").where({ id }).first();
    }

    static async findAll() {
        return db("users").select("*");
    }
}

module.exports = User;
