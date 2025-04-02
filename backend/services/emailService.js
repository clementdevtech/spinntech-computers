const nodemailer = require("nodemailer");

// Mail transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Helps with some SSL/TLS issues
  },
  pool: true, // Enables connection pooling
  maxConnections: 5, // Limits the number of concurrent connections
  maxMessages: 10, // Limits the number of messages per connection
});

// Generic email sender with retry logic
exports.sendEmail = async (to, subject, text, html) => {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      await transporter.sendMail({
        from: `Support <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html,
      });
      console.log(`📧 Email successfully sent to ${to}`);
      return;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts}: Email sending error -`, error.message);
      if (attempts >= maxAttempts) {
        throw new Error("Failed to send email after multiple attempts.");
      }
    }
  }
};

// Email verification
exports.sendVerificationEmail = async (email, verificationLink) => {
  const subject = "Verify Your Email";
  const html = `<h3>Click the link below to verify your email:</h3>
                <a href="${verificationLink}">${verificationLink}</a>`;
  return exports.sendEmail(email, subject, "", html);
};

// Password reset email
exports.sendResetPasswordEmail = async (email, resetLink) => {
  const subject = "Reset Your Password";
  const html = `<h3>Click the link below to reset your password:</h3>
                <a href="${resetLink}">${resetLink}</a>`;
  return exports.sendEmail(email, subject, "", html);
};
