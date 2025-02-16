const { Affiliate } = require('../models');

// Middleware to track affiliate links
exports.trackAffiliate = async (req, res, next) => {
    const { ref } = req.query;

    if (ref) {
        try {
            const affiliate = await Affiliate.findOne({ where: { code: ref } });
            if (affiliate) {
                req.session.affiliateId = affiliate.id; // Store in session
            }
        } catch (error) {
            console.error("Affiliate tracking error:", error.message);
        }
    }
    next();
};
