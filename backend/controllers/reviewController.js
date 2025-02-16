const Review = require("../models/Review");

exports.addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.id;

        const newReview = await Review.create({ userId, productId, rating, comment });

        res.status(201).json({ message: "Review added successfully", newReview });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.findByProductId(req.params.productId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        await Review.delete(req.params.id);
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
