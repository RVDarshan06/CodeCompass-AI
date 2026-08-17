const Resume = require("../models/Resume");
const { checkATS } = require("../services/aiService");

const checkATSController = async (req, res) => {
    try {
        const { jobDescription } = req.body;

        // Check job description
        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({
                message: "Please provide a job description."
            });
        }

        // Find the latest uploaded resume
        const resume = await Resume.findOne()
            .sort({ createdAt: -1 });

        if (!resume) {
            return res.status(404).json({
                message: "No resume found. Please upload a resume first."
            });
        }

        console.log("Resume found:", resume.fileName);

        console.log("Sending resume and job description to Gemini...");

        // Send resume + job description to AI
        const analysis = await checkATS(
            latestResume.extractedText,
             jobDescription
        );

        console.log("ATS analysis generated successfully.");

        return res.status(200).json({
            message: "ATS analysis completed successfully.",
            resumeId: resume._id,
            fileName: resume.fileName,
            analysis: analysis
        });

    } catch (error) {

        console.error("ATS check error:", error);

        return res.status(500).json({
            message: "Failed to check ATS compatibility.",
            error: error.message
        });
    }
};

module.exports = {
    checkATSController
};