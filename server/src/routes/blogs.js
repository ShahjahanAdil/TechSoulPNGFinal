const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const blogsModel = require("../models/blogs");

router.get("/blogs/get", async (req, res) => {
    try {
        const allBlogs = await blogsModel.find().sort({ createdAt: -1 }).limit(5)

        return res.status(200).json({ message: "Blogs fetched successfully!", allBlogs })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/blog/add-comment/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, comment } = req.body;
        if (!name?.trim() || !email?.trim() || !comment?.trim()) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const blog = await blogsModel.findById(id);
        if (!blog) return res.status(404).json({ message: "Blog not found." });

        blog.comments.push({ name, email, comment, createdAt: new Date() });
        const updatedBlog = await blog.save();

        res.status(201).json({ message: "Comment added", updatedBlog });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router