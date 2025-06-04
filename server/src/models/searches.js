const mongoose = require("mongoose")
const { Schema } = mongoose

const searchesSchema = new Schema({
    search: { type: String, required: true, index: true },
    count: { type: Number, default: 0 }
}, { timestamps: true })

const searchesModel = mongoose.models.searches || mongoose.model("searches", searchesSchema)

module.exports = searchesModel