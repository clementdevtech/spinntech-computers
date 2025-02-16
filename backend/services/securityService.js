const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { OTP } = require('../models');
const emailService = require('./emailService');

const SALT_ROUNDS = 10;

// Hash password
exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

// Verify password
exports.verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// Generate OTP
exports.generateOTP = async (userId, email) => {
    const otpCode = crypto.randomInt(100000, 999999).toString();
    await OTP.create({ userId, otp: otpCode, expiresAt: new Date(Date.now() + 10 * 60 * 1000) }); // Expires in 10 min
    await emailService.sendEmail(email, "Your OTP Code", `Your OTP code is: ${otpCode}`);
    return otpCode;
};

// Verify OTP
exports.verifyOTP = async (userId, otpCode) => {
    const otpEntry = await OTP.findOne({ where: { userId, otp: otpCode } });
    if (!otpEntry || new Date() > otpEntry.expiresAt) {
        throw new Error("Invalid or expired OTP.");
    }
    await OTP.destroy({ where: { userId } }); // Delete OTP after verification
    return true;
};
