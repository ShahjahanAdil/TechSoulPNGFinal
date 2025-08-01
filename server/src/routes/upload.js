const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const imagesModel = require("../models/images")
const fs = require("fs");
const uploadToFTP = require("../middlewares/ftp");

const generateRandomID = () => Math.random().toString(32).slice(2)

router.post("/upload-image", upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    const localPath = req.file.path;
    const remoteFileName = req.file.filename;

    try {
        const imageURL = await uploadToFTP(localPath, remoteFileName);
        fs.unlinkSync(localPath);

        const formData = req.body;
        const parsedTags = JSON.parse(formData.tags || '[]');

        const imageData = {
            ...formData,
            imageID: generateRandomID(),
            imageURL,
            type: req.file.mimetype.split("/").pop(),
            tags: parsedTags,
            status: "published",
        };

        await imagesModel.create(imageData);

        res.status(201).json({ message: "Image uploaded successfully", imageURL });
    } catch (error) {
        console.error("Upload Error:", error.message);
        res.status(500).json({ error: "FTP upload failed" });
    }
});

module.exports = router;