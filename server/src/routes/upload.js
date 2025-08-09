const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const imagesModel = require("../models/images")
const fs = require("fs");
const uploadToFTP = require("../middlewares/ftp");

const generateRandomID = () => Math.random().toString(32).slice(2)

router.post("/upload-image", upload.fields([
    { name: 'originalImage', maxCount: 1 },
    { name: 'editedImage', maxCount: 1 }
]), async (req, res) => {
    if (!req.files || !req.files.originalImage || !req.files.editedImage) {
        return res.status(400).json({
            error: "Both original and edited images are required."
        });
    }

    const originalFile = req.files.originalImage[0];
    const editedFile = req.files.editedImage[0];

    const originalLocalPath = originalFile.path;
    const editedLocalPath = editedFile.path;
    const originalRemoteFileName = originalFile.filename;
    const editedRemoteFileName = editedFile.filename;

    try {
        const [originalImageURL, editedImageURL] = await Promise.all([
            uploadToFTP(originalLocalPath, originalRemoteFileName),
            uploadToFTP(editedLocalPath, editedRemoteFileName)
        ]);

        fs.unlinkSync(originalLocalPath);
        fs.unlinkSync(editedLocalPath);

        const formData = req.body;
        const parsedTags = JSON.parse(formData.tags || '[]');

        const imageData = {
            ...formData,
            imageID: generateRandomID(),
            imageURL: originalImageURL,
            originalImageURL,
            editedImageURL,
            type: originalFile.mimetype.split("/").pop(),
            tags: parsedTags,
            status: "published",
        };

        await imagesModel.create(imageData);

        res.status(201).json({ message: "Image uploaded successfully" });
    } catch (error) {
        try {
            if (fs.existsSync(originalLocalPath)) fs.unlinkSync(originalLocalPath);
            if (fs.existsSync(editedLocalPath)) fs.unlinkSync(editedLocalPath);
        } catch (cleanupError) {
            console.error("Cleanup error:", cleanupError);
        }

        console.error("Upload Error:", error.message);
        res.status(500).json({ error: "Image upload failed: " + error.message });
    }
});

module.exports = router;