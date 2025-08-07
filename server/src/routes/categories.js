const express = require("express")
const router = express.Router()
const fs = require("fs")

const upload = require("../middlewares/multer")
const categoriesModel = require("../models/categories")
const uploadToFTP = require("../middlewares/ftp")
const delFromFtp = require("../middlewares/delFromFtp")

router.get("/categories", async (req, res) => {
    try {
        const cats = await categoriesModel.find().sort({ createdAt: -1 })

        return res.status(200).json({ message: "Categories fetched!", cats })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/create-category", upload.single("image"), async (req, res) => {
    try {
        const { category } = req.body;

        if (!category) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const existing = await categoriesModel.findOne({ category: category.toLowerCase() });
        if (existing) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: "Category already exists" });
        }

        let imageURL = "";

        if (req.file) {
            const localPath = req.file.path;
            const remoteFileName = `category_${Date.now()}_${req.file.originalname}`;
            imageURL = await uploadToFTP(localPath, remoteFileName);
            fs.unlinkSync(localPath);
        }

        const newCat = await categoriesModel.create({
            category: category.toLowerCase(),
            imageURL,
            subcategories: []
        });

        return res.status(201).json({ message: "Category created successfully!", newCat });
    }
    catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error("Category creation error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.patch("/update-category", upload.single("image"), async (req, res) => {
    try {
        const { _id, category } = req.body;
        const categoryToUpdate = await categoriesModel.findById(_id);

        if (!categoryToUpdate) {
            return res.status(404).json({ message: "Category not found" });
        }

        let imageURL = categoryToUpdate.imageURL;

        // If new image is uploaded
        if (req.file) {
            try {
                // Delete old image if exists
                if (categoryToUpdate.imageURL) {
                    const oldFileName = categoryToUpdate.imageURL.split("/").pop();
                    await delFromFtp(oldFileName);
                }

                // Upload new image
                const remoteFileName = `category_${Date.now()}_${req.file.originalname}`;
                imageURL = await uploadToFTP(req.file.path, remoteFileName);
                fs.unlinkSync(req.file.path); // Remove temp file
            } catch (ftpError) {
                if (req.file) fs.unlinkSync(req.file.path);
                throw new Error("Failed to update image");
            }
        }

        // Update category
        const updatedCategory = await categoriesModel.findByIdAndUpdate(_id, { category: category.toLowerCase(), imageURL }, { new: true });

        return res.status(202).json({ message: "Category updated successfully!", updatedCategory });
    }
    catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error("Update category error:", error);
        res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
});

router.delete("/delete-category/:delCatID", async (req, res) => {
    try {
        const { delCatID } = req.params
        const category = await categoriesModel.findOne({ _id: delCatID })
        if (!category) {
            return res.status(404).json({ message: "Catergory not found" });
        }

        if (category.imageURL) {
            try {
                const fileName = category.imageURL.split("/").pop();
                await delFromFtp(fileName);
            } catch (ftpError) {
                console.error("FTP deletion error:", ftpError);
            }
        }

        await categoriesModel.findOneAndDelete({ _id: delCatID })

        return res.status(203).json({ message: "Category deleted!" })
    }
    catch (error) {
        console.error("Category deletion error:", error)
        res.status(500).json({ message: error.message || "Internal server error" })
    }
})

router.post("/add-subcategory", async (req, res) => {
    try {
        const { _id, subcategory } = req.body

        await categoriesModel.findOneAndUpdate({ _id }, { $addToSet: { subcategories: subcategory } }, { new: true })

        return res.status(201).json({ message: "Subcategory added!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/delete-subcategory", async (req, res) => {
    try {
        const { _id, subCat } = req.body

        await categoriesModel.findOneAndUpdate({ _id }, { $pull: { subcategories: subCat } }, { new: true })

        return res.status(202).json({ message: "Subcategory removed!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router