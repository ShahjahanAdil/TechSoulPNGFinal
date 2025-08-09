const express = require("express");
const router = express.Router();
const path = require("path");
const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const { storage } = require("../configs/firebase");
const fs = require("fs").promises;

const authModel = require("../models/auth")

router.post("/remove-bg", async (req, res) => {
    const { imageUrl, userID } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ message: "No image URL received" });
    }

    try {
        const uniqueId = uuidv4();
        const outputPath = path.join(__dirname, "..", "uploads", `no-bg-${uniqueId}.png`);

        // Ensure output directory exists
        await fs.mkdir(path.dirname(outputPath), { recursive: true });

        const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';

        const python = spawn(pythonCommand, [
            path.join(__dirname, "..", "remove_bg.py"),
            imageUrl,
            outputPath,
        ]);

        let stdout = "";
        let stderr = "";

        python.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        python.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        python.on("close", async (code) => {
            if (code !== 0) {
                console.error("Python script failed with error: " + stderr);
                return res.status(500).json({ message: "Background removal failed", detail: stderr });
            }

            // Verify the processed image exists
            try {
                await fs.access(outputPath);
            } catch {
                return res.status(500).json({ message: "Processed image not found" });
            }

            const processedImageUrl = `/uploads/no-bg-${uniqueId}.png`;
            res.json({ processedImageUrl });

            if (imageUrl.includes("firebasestorage.googleapis.com")) {
                (async () => {
                    try {
                        const filePath = decodeURIComponent(imageUrl.split("/o/")[1].split("?")[0]);
                        const file = storage.bucket().file(filePath);
                        await file.delete();
                    } catch (error) {
                        console.error("Error deleting Firebase file:", error);
                    }
                })();
            }

            if (userID) {
                await authModel.findOneAndUpdate({ userID }, { $inc: { conversions: 1 } }, { new: true })
            }
        });
    } catch (err) {
        console.error("Error processing image:", err);
        res.status(500).json({ message: "Error processing image", detail: err.message });
    }
});

module.exports = router;