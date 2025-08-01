const mongoose = require("mongoose")
const { Schema } = mongoose

const blogsSchema = new Schema({
    imageURL: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    comments: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                }
            }
        ]
    },
}, { timestamps: true })

const blogsModel = mongoose.models.blogs || mongoose.model("blogs", blogsSchema)

module.exports = blogsModel