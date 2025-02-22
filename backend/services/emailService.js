const nodemailer = require("nodemailer");

//mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generic email sender
exports.sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: `"Support" <${config.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("Email sending error:", error.message);
    throw new Error("Failed to send email.");
  }
};

//email verification
exports.sendVerificationEmail = async (email, verificationLink) => {
  const subject = "Verify Your Email";
  const html = `<h3>Click the link below to verify your email:</h3>
                <a href="${verificationLink}">${verificationLink}</a>`;

  return exports.sendEmail(email, subject, "", html);
};


//password reset email
exports.sendResetPasswordEmail = async (email, resetLink) => {
    const subject = "Reset Your Password";
    const html = `<h3>Click the link below to reset your password:</h3>
                  <a href="${resetLink}">${resetLink}</a>`;
  
    return exports.sendEmail(email, subject, "", html);
  };