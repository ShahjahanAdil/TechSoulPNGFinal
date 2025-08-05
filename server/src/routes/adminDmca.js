const express = require("express")
const router = express.Router()

const dmcaModel = require("../models/dmca")

router.get("/fetch-dmca", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const skip = (page - 1) * limit

        const reports = await dmcaModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalReports = await dmcaModel.countDocuments()

        return res.status(200).json({ message: "Reports fetched successfully!", reports, totalReports })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/dmca/update/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updated = await dmcaModel.findByIdAndUpdate(id, { status }, { new: true });
        res.status(202).json({ message: "Status updated successfully!", report: updated });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Failed to update status." });
    }
});


router.delete("/dmca/delete/:delID", async (req, res) => {
    try {
        const delID = req.params.delID;
        await dmcaModel.findByIdAndDelete(delID);

        return res.status(203).json({ message: "Report deleted successfully!" });
    } catch (error) {
        console.error("Blog delete error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router