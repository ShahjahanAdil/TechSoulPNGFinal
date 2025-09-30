const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
require("dotenv").config();

const verifyEmailModel = require('../models/verifyemail')
const authModel = require('../models/auth')
const verfiyToken = require('../middlewares/auth')

const transporter = nodemailer.createTransport({
    host: "mail.flowerpng.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_VERIFICATION_EMAIL,
        pass: process.env.NODEMAILER_PASS
    }
});

router.post("/create-email-verification", async (req, res) => {
    try {
        const { email } = req.body

        await verifyEmailModel.deleteOne({ email });

        const code = Math.floor(100000 + Math.random() * 900000);
        await verifyEmailModel.create({ email, code })

        await transporter.sendMail({
            from: `"Email Verification - FlowerPNG" <${process.env.NODEMAILER_VERIFICATION_EMAIL}>`,
            to: email,
            subject: "Code for email verification - FlowerPNG",
            html: `
                <h2>Email Verification</h2>
                <p>Your verification code is:</p>
                <h1 style="color:#4CAF50">${code}</h1>
            `
        });

        res.status(201).json({ message: "Verification code sent to your email!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to send verification email. Please try again." });
    }
})

router.post("/signup", async (req, res) => {
    try {
        const newUserData = req.body
        const { email, password, code } = newUserData

        const record = await verifyEmailModel.findOne({ email });
        if (!record) {
            return res.status(400).json({ message: "No verification request found for this email." });
        }

        if (record.code !== code) {
            return res.status(400).json({ message: "Invalid verification code." });
        }

        const userFound = await authModel.findOne({ email })
        if (userFound) {
            return res.status(403).json({ message: "User account already exists!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = { ...newUserData, password: hashedPassword }

        await authModel.create(user)
        await verifyEmailModel.deleteOne({ email });

        res.status(201).json({ message: "User registered succesfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await authModel.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const matchedPassword = await bcrypt.compare(password, user.password)

        if (matchedPassword) {
            const { userID } = user
            const token = jwt.sign({ userID }, "secret-key", { expiresIn: '3d' })

            res.status(200).json({ message: "Login Successful!", token, user })
        } else {
            return res.status(401).json({ message: "Invalid email or password" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/user", verfiyToken, async (req, res) => {
    try {
        const userID = req.userID
        const user = await authModel.findOne({ userID })

        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }

        res.status(200).json({ user })
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: error.message })
    }
})

router.post("/google", async (req, res) => {
    try {
        const googleUserData = req.body;
        const { email } = googleUserData;

        const userFound = await authModel.findOne({ email });
        if (userFound) {
            const token = jwt.sign({ userID: userFound.userID }, "secret-key", { expiresIn: '3d' });
            return res.status(200).json({ message: "Login successful!", token, user: userFound })
        }

        const createdUser = await authModel.create(googleUserData);
        const token = jwt.sign({ userID: createdUser.userID }, "secret-key", { expiresIn: '3d' });

        res.status(201).json({ message: "User registered successfully!", token, user: createdUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router