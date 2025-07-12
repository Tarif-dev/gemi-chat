import User from "@/models/userModel";
import nodemailer from "nodemailer";
const bcrypt = require("bcrypt");

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // TODO : configure mail for usage
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9068b6cea50308",
    pass: "8831073c3fb356"
  }
});
    const mailOptions = {
      from: "tarifhussain212@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click Here to verify</p>
      <button href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Verify</button>
      <p>Or log on to the following link</p>
      <a href=href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">"${process.env.DOMAIN}/verifyemail?token=${hashedToken}"</a>`, // HTML body
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a test account or replace with real credentials.
