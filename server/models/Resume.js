const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true
        },

        filePath: {
            type: String,
            required: true
        },

        extractedText: {
            type: String,
            required: true
        },

        analysis: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Resume", resumeSchema);