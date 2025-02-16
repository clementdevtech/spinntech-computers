const db = require("../config/db");

class Affiliate {
    static async create({ userId, referralCode }) {
        const [affiliate] = await db("affiliates")
            .insert({ user_id: userId, referral_code: referralCode })
            .returning("*");
        return affiliate;
    }

    static async findReferrals(userId) {
        return db("users").where({ referred_by: userId }).select("id", "username", "email");
    }

    static async calculateEarnings(userId) {
        const result = await db("affiliates")
            .where({ user_id: userId })
            .sum("earnings as totalEarnings")
            .first();
        return result.totalEarnings || 0;
    }
}

module.exports = Affiliate;
