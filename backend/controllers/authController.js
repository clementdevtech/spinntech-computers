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

    const verificationToken = crypto.randomBytes(32).toString("hex");

    await db("users").insert({
      username: name,
      email,
      password_hash: hashedPassword,
      verification_token: verificationToken,
      is_verified: false,
    });


    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    res.status(201).json({ message: "Registration successful! Please check your email to verify your account." });

  } catch (error) {
    console.error('Error registering user', error.message);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
    const { token } = req.query;
  
    try {
      const user = await db("users").where({ verification_token: token }).first();
  
      if (!user) return res.status(400).json({ message: "Invalid or expired token" });
  
      await db("users").where({ id: user.id }).update({ is_verified: true, verification_token: null });
  
      res.json({ message: "Email verified successfully. You can now log in." });
  
    } catch (error) {
      res.status(500).json({ message: "Error verifying email", error: error.message });
      console.error('Error verifying email', error.message);
    }
  };

  exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        if (!user.is_verified) {
            return res.status(403).json({ 
                message: "Your account is not verified. Please check your email.", 
                action: "verify"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


exports.resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log('resendVerificationEmail', email);
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.is_verified) {
            return res.status(400).json({ message: "Your account is already verified." });
        }
        
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
        await sendVerificationEmail(email, verificationLink);

        res.status(200).json({ message: "Verification email sent successfully." });
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
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        // Send email with reset link (email service should be properly configured)
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        await sendResetPasswordEmail(user.email, resetLink);

        res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await User.updatePassword(user.id, hashedPassword);

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
