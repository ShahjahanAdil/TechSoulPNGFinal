const express = require("express")
const router = express.Router()

const categoriesModel = require('../models/categories')
const imagesModel = require('../models/images')

router.get("/main/fetch-categories", async (req, res) => {
    try {
        const cats = await categoriesModel.find()

        return res.status(200).json({ message: "Categories fetched successfully!", cats })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/main/fetch-images", async (req, res) => {
    try {
        const category = req.query.category;
        const filter = req.query.filter;
        const searchText = req.query.searchText;
        const page = parseInt(req.query.page) || 1;
        const limit = 25;
        const skip = (page - 1) * limit;

        const searchConditions = [];

        if (category) {
            if (category.toLowerCase() === 'freebies') {
                searchConditions.push({
                    $or: [
                        { license: { $regex: 'free', $options: "i" } }
                    ]
                });
            }
            else {
                searchConditions.push({
                    $or: [
                        { title: { $regex: category, $options: "i" } },
                        { description: { $regex: category, $options: "i" } },
                        { category: { $regex: category, $options: "i" } },
                        { subcategory: { $regex: category, $options: "i" } },
                        { tags: { $elemMatch: { $regex: category, $options: "i" } } }
                    ]
                });
            }
        }

        if (filter) {
            const f = filter.toLowerCase();

            if (['png', 'jpg', 'jpeg', 'webp'].includes(f)) {
                searchConditions.push({ type: { $regex: f, $options: "i" } });
            } else if (f === 'backgrounds') {
                searchConditions.push({ type: { $in: [/jpg/i, /webp/i] } });
            } else if (f === 'illustrations') {
                searchConditions.push({ type: { $in: [/png/i, /jpg/i] } });
            }
        }

        if (searchText) {
            searchConditions.push({
                $or: [
                    { title: { $regex: searchText, $options: "i" } },
                    { description: { $regex: searchText, $options: "i" } },
                    { category: { $regex: searchText, $options: "i" } },
                    { subcategory: { $regex: searchText, $options: "i" } },
                    { tags: { $elemMatch: { $regex: searchText, $options: "i" } } }
                ]
            });
        }

        const searchQuery = searchConditions.length > 0 ? { $and: searchConditions } : {};

        const imgs = await imagesModel.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalImgs = await imagesModel.countDocuments(searchQuery);

        return res.status(200).json({ message: "Images fetched successfully!", imgs, totalImgs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// router.get("/main/fetch-images", async (req, res) => {
//     try {
//         const category = req.query.category;
//         const filter = req.query.filter;
//         const searchText = req.query.searchText;
//         const page = parseInt(req.query.page) || 1;
//         const limit = 25;
//         const skip = (page - 1) * limit;

//         let searchQuery = {};
//         if (category) {
//             searchQuery = {
//                 $or: [
//                     { title: { $regex: category, $options: "i" } },
//                     { description: { $regex: category, $options: "i" } },
//                     { category: { $regex: category, $options: "i" } },
//                     { subcategory: { $regex: category, $options: "i" } },
//                     { tags: { $elemMatch: { $regex: category, $options: "i" } } }
//                 ]
//             };
//         } else if (searchText) {
//             searchQuery = {
//                 $or: [
//                     { title: { $regex: searchText, $options: "i" } },
//                     { description: { $regex: searchText, $options: "i" } },
//                     { category: { $regex: searchText, $options: "i" } },
//                     { subcategory: { $regex: searchText, $options: "i" } },
//                     { tags: { $elemMatch: { $regex: searchText, $options: "i" } } }
//                 ]
//             };
//         }

//         const imgs = await imagesModel.find(searchQuery)
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit);

//         const totalImgs = await imagesModel.countDocuments(searchQuery);

//         return res.status(200).json({ message: "Images fetched successfully!", imgs, totalImgs });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// })

module.exports = router