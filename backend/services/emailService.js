const nodemailer = require('nodemailer');
const config = require('../config');

// Configure mail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    }
});

// Send email function
exports.sendEmail = async (to, subject, text, html) => {
    try {
        await transporter.sendMail({
            from: `"Support" <${config.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });
        console.log(`📧 Email sent to ${to}`);
    } catch (error) {
        console.error("Email sending error:", error.message);
        throw new Error("Failed to send email.");
    }
};
