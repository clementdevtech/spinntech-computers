const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {db} = require("../db");
const crypto = require('crypto');

const { sendVerificationEmail, sendResetPasswordEmail } = require("../services/emailService");

exports.register = async (req, res) => {
    let { name, email, password } = req.body;
    password = String(password);
   
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
  
    try {
      const existingUser = await db('users')
        .where('username', name)
        .orWhere('email', email)
        .first();
      
      if (existingUser) {
        return res.status(400).json({ message: "Username or email already taken" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Generate a long verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  
      await db("users").insert({
        username: name,
        email,
        password_hash: hashedPassword,
        verification_token: verificationToken,
        verification_expires_at: expiresAt,
        is_verified: false,
      });
  
      const verificationLink = `${process.env.CLIENT_URL}/verify-email?email=${encodeURIComponent(email)}&token=${verificationToken}`;
      await sendVerificationEmail(email, verificationLink);
  
      res.status(201).json({ message: "Registration successful! Please check your email to verify your account." });
  
    } catch (error) {
      console.error('Error registering user', error.message);
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
  };


  exports.verifyEmail = async (req, res) => {
    try {
        const { email, token } = req.query; 

        if (!email || !token) {
            console.error("Verification Error: Missing email or token.");
            return res.status(400).json({ message: "Verification token and email are required." });
        }

        console.log("Received email & token for verification:", email, token);

        const user = await db("users").where({ email, verification_token: token }).first();

        if (!user) {
            console.error("Verification Error: Invalid email or token.");
            return res.status(400).json({ message: "Invalid verification link." });
        }

        if (user.is_verified) {
            return res.status(400).json({ message: "Your account is already verified." });
        }

        if (new Date(user.verification_expires_at) < new Date()) {
            return res.status(400).json({ message: "Verification link has expired. Please request a new one." });
        }

        // Mark the user as verified and remove the verification token
        await db("users").where({ id: user.id }).update({
            is_verified: true,
            verification_token: null,
            verification_expires_at: null,
        });

        console.log(`User ${user.email} verified successfully.`);

        res.json({ message: "Your email has been successfully verified. You can now log in." });

    } catch (error) {
        console.error("Verification Server Error:", error.message);
        res.status(500).json({ message: "Error verifying email.", error: error.message });
    }
};




exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ensure email and password are not undefined
        if (!email || !password) {
            console.error("Login Error: Email or password is missing.");
            return res.status(400).json({ message: "Email and password are required." });
        }

        console.log("Login request received:", { email, password }); // Debugging log

        const user = await db("users").where({ email }).first();

        // Check if user exists
        if (!user) {
            console.error("Login Error: User not found.");
            return res.status(401).json({ message: "Invalid email or password." });
        }

        console.log("User found:", user); // Debugging log

        if (!user.is_verified) {
            return res.status(403).json({ 
                message: "Your account is not verified. Please check your email.", 
                action: "verify"
            });
        }

        // Ensure password hash exists in the database
        if (!user.password_hash) {
            console.error("Login Error: Password hash is missing for user:", user.email);
            return res.status(500).json({ message: "Server error: Password data missing." });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            console.error("Login Error: Incorrect password for user:", user.email);
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign({ id: user.id }, process.env.secretKey, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login successful", user });

    } catch (error) {
        console.error("Login Server Error:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};



exports.resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const user = await db("users").where({ email }).first();
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.is_verified) {
            return res.status(400).json({ message: "Your account is already verified." });
        }

        // Generate a new verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

        // Update user record with the new verification token
        await db("users").where({ id: user.id }).update({
            verification_token: verificationToken,
            verification_expires_at: expiresAt,
        });

        const verificationLink = `${process.env.CLIENT_URL}/verify-email?email=${encodeURIComponent(email)}&token=${verificationToken}`;
        await sendVerificationEmail(email, verificationLink);

        res.status(200).json({ message: "A new verification email has been sent." });

    } catch (error) {
        res.status(500).json({ message: "Error sending verification email.", error: error.message });
        console.error('Error verifying email', error.message);
    }
};


exports.logoutUser = (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const user = await db("users").where({ email }).first();
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Generate a secure random reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        // Store the hashed token & expiration time in the database
        await db("users").where({ id: user.id }).update({
            reset_password_token: hashedToken,
            reset_password_expires_at: expiresAt,
        });

        
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        await sendResetPasswordEmail(user.email, resetLink);

        res.json({ message: "Password reset link sent to your email." });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required." });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await db("users")
            .where({ reset_password_token: hashedToken })
            .andWhere("reset_password_expires_at", ">", new Date())
            .first();

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

    
        await db("users").where({ id: user.id }).update({
            password_hash: hashedPassword,
            reset_password_token: null,
            reset_password_expires_at: null,
        });

        res.json({ message: "Password reset successful. You can now log in." });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};