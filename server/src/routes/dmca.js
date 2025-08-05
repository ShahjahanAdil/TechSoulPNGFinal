const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")
const { config } = require("dotenv")
config()

const dmcaModel = require("../models/dmca")

router.post("/dmca/send-mail", async (req, res) => {
    const newReportData = req.body;
    const { fullname, email, subject, copyrightURL, reportedURL, message, enteredCode, originalCode } = newReportData

    try {
        const transporter = nodemailer.createTransport({
            host: "mail.flowerpng.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_DMCA_EMAIL,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${fullname}" <${email}>`,
            to: process.env.NODEMAILER_DMCA_EMAIL,
            replyTo: email,
            subject: `DCMA Form - ${subject}`,
            html: `
                <div style="width: 100%; display: flex; justify-content: center; padding: 20px;">
        <div
            style="width: 100%; max-width: 500px; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.125);">
            <h2 style="text-align: center;">flowerpng.com</h2>
            <h3 style="background-color: #f12c2c19; color: #f12c2c; padding: 10px; text-align: center; border-radius: 10px;">New Report from DCMA Form</h3>
            <p style="padding-top: 10px;"><strong>Subject:</strong> ${subject}</p>
            <div style="display: flex; gap: 20px;">
                <p><strong>Fullname:</strong> ${fullname}</p>
                <p><strong>Email:</strong> ${email}</p>
            </div>
            <p><strong>Message:</strong><br />${message}</p>
            <p><strong>Copyright URL:</strong><br />${copyrightURL}</p>
            <p><strong>Reported URL:</strong><br />${reportedURL}</p>
            <div style="display: flex; gap: 20px;">
                <p><strong>Original Code:</strong><br />${originalCode}</p>
                <p><strong>User Entered Code:</strong><br />${enteredCode}</p>
            </div>
        </div>
    </div>
      `,
        });

        await dmcaModel.create(newReportData)

        res.status(201).json({ message: "Report sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

module.exports = router