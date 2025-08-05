const mongoose = require("mongoose")
const { Schema } = mongoose

const dmcaSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    copyrightURL: { type: String, required: true },
    reportedURL: { type: String, required: true },
    message: { type: String, required: true },
    enteredCode: { type: String, required: true },
    originalCode: { type: String, required: true },
    status: { type: String, default: 'pending' },
}, { timestamps: true })

const dmcaModel = mongoose.models.dmca || mongoose.model("dmca", dmcaSchema)

module.exports = dmcaModel