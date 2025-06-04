const express = require("express")
const router = express.Router()

const searchesModel = require('../models/searches')

router.get("/searches", async (req, res) => {
    try {
        const searches = await searchesModel.find().sort({ count: -1 })

        return res.status(200).json({ message: "Search fetched successfully!", searches })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/searches/add", async (req, res) => {
    try {
        const searchText = req.query.searchText?.toLowerCase()

        if (!searchText) {
            return res.status(400).json({ message: "Missing searchText" });
        }

        const existingSearch = await searchesModel.findOne({ search: searchText })

        if (existingSearch) {
            existingSearch.count += 1;
            await existingSearch.save();
        } else {
            await searchesModel.create({ search: searchText });
        }

        return res.status(201).json({ message: "Search added to backend successfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router