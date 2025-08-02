const express = require("express")
const router = express.Router()

const imagesModel = require('../models/images')
const categoriesModel = require('../models/categories')

router.get("/home/fetch-categories", async (req, res) => {
    try {
        const cats = await categoriesModel.find().limit(7)

        return res.status(200).json({ message: "Categories fetched successfully!", cats })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/fetch-recent-images", async (req, res) => {
    try {
        const imgs = await imagesModel.find().sort({ createdAt: -1 }).limit(30)

        return res.status(200).json({ message: "Images fetched successfully!", imgs })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/fetch-tab-images", async (req, res) => {
    try {
        const category = req.query.category
        const limit = 6

        const imgs = await imagesModel.find({ category }).sort({ createdAt: -1 }).limit(limit)

        return res.status(200).json({ message: "Images fetched successfully!", imgs })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/home/search-suggestions", async (req, res) => {
    try {
        const query = req.query.q;
        const category = req.query.category?.toLowerCase();

        if (!query) {
            return res.status(200).json({ results: [] });
        }

        const baseConditions = [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            { subcategory: { $regex: query, $options: "i" } },
            { tags: { $elemMatch: { $regex: query, $options: "i" } } }
        ];

        const filterConditions = [];

        if (category) {
            if (["png", "jpg", "jpeg", "webp"].includes(category)) {
                filterConditions.push({ type: { $regex: category, $options: "i" } });
            } else if (category === 'backgrounds') {
                filterConditions.push({ type: { $in: [/jpg/i, /webp/i] } });
            } else if (category === 'illustrations') {
                filterConditions.push({ type: { $in: [/png/i, /jpg/i] } });
            }
        }

        const finalQuery = filterConditions.length > 0
            ? { $and: [{ $or: baseConditions }, ...filterConditions] }
            : { $or: baseConditions };

        const results = await imagesModel.find(finalQuery).limit(3);

        res.status(200).json({ results });
    } catch (err) {
        console.error("Suggestion error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})

// router.get("/home/search-suggestions", async (req, res) => {
//     try {
//         const query = req.query.q;

//         if (!query) {
//             return res.status(200).json({ results: [] });
//         }

//         const searchQuery = {
//             $or: [
//                 { title: { $regex: query, $options: "i" } },
//                 { description: { $regex: query, $options: "i" } },
//                 { category: { $regex: query, $options: "i" } },
//                 { subcategory: { $regex: query, $options: "i" } },
//                 { tags: { $elemMatch: { $regex: query, $options: "i" } } }
//             ]
//         }

//         const results = await imagesModel.find(searchQuery).limit(3);

//         res.status(200).json({ results });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

module.exports = router