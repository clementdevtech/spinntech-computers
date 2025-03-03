const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    //console.log("Middleware triggered for:", req.method, req.url);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        //console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Error in verifying the user:', error.message)
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};


// Middleware to check if user is an admin
exports.isAdmin = (req, res, next) => {
    console.log("Checking Admin Role:", req.user.role);

    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
};
