const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const upload = require("../middlewares/multer");
const uploadToFTP = require("../middlewares/ftp");
const blogsModel = require("../models/blogs");
const delFromFtp = require("../middlewares/delFromFtp")

router.get("/blogs/get", async (req, res) => {
    try {
        const allBlogs = await blogsModel.find().sort({ createdAt: -1 })

        return res.status(200).json({ message: "Blogs fetched successfully!", allBlogs })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/blogs/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const { title, description, author } = req.body;

        const localPath = req.file.path;
        const remoteFileName = req.file.filename;

        const remotePath = await uploadToFTP(localPath, remoteFileName);
        fs.unlinkSync(localPath);

        const blog = await blogsModel.create({
            title,
            description,
            author,
            imageURL: remotePath,
            comments: []
        });

        res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
        console.error("Blog creation failed:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/blogs/delete/:delID", async (req, res) => {
    try {
        const delID = req.params.delID;

        const blog = await blogsModel.findById(delID);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        const imageURL = blog.imageURL;
        const remoteFileName = imageURL?.split("/").pop();

        if (remoteFileName) {
            try {
                await delFromFtp(remoteFileName);
                console.log("Image deleted from FTP:", remoteFileName);
            } catch (ftpError) {
                console.warn("Image deletion from FTP failed:", ftpError.message);
            }
        }

        await blogsModel.findByIdAndDelete(delID);

        return res.status(203).json({ message: "Blog deleted successfully!" });
    } catch (error) {
        console.error("Blog delete error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// router.patch("/blogs/update/:id", upload.single("image"), async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, description } = req.body;

//         if (!title?.trim() || !description?.trim()) {
//             return res
//                 .status(400)
//                 .json({ error: "Title and description are required." });
//         }

//         const updateData = { title, description };
//         if (req.file) {
//             updateData.imageURL = `/uploads/${req.file.filename}`;
//         }

//         const updatedBlog = await blogsModel.findByIdAndUpdate(
//             id,
//             updateData,
//             { new: true }
//         );

//         if (!updatedBlog) {
//             return res.status(404).json({ error: "Blog not found." });
//         }

//         res
//             .status(202)
//             .json({ message: "Blog updated successfully", blog: updatedBlog });
//     } catch (error) {
//         console.error("Blog update error:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }
// );

router.patch("/blogs/update/:id", upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title?.trim() || !description?.trim()) {
            return res.status(400).json({ error: "Title and description are required." });
        }

        const blog = await blogsModel.findById(id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found." });
        }

        const updateData = { title, description };

        if (req.file) {
            const oldFileName = blog.imageURL?.split("/").pop();
            if (oldFileName) {
                try {
                    await delFromFtp(oldFileName);
                } catch (err) {
                    console.warn("Failed to delete old image:", err.message);
                }
            }

            const localPath = path.join(__dirname, "..", "..", "uploads", req.file.filename);
            const newFileName = req.file.filename;

            const ftpPath = await uploadToFTP(localPath, newFileName);
            updateData.imageURL = `/${ftpPath}`;

            fs.unlinkSync(localPath);
        }

        const updatedBlog = await blogsModel.findByIdAndUpdate(id, updateData, { new: true });

        res.status(202).json({ message: "Blog updated successfully", blog: updatedBlog });

    } catch (error) {
        console.error("Blog update error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;