const Resume = require("../models/Resume");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const { analyzeResume: analyzeWithAI } = require("../services/aiService");


const analyzeResume = async (req, res) => {

    try {

        // ==========================================
        // 1. CHECK WHETHER FILE WAS UPLOADED
        // ==========================================

        if (!req.file) {

            return res.status(400).json({
                message: "Please upload a resume."
            });

        }


        const file = req.file;

        let extractedText = "";


        // ==========================================
        // 2. EXTRACT TEXT FROM PDF
        // ==========================================

        if (file.mimetype === "application/pdf") {

            const dataBuffer = fs.readFileSync(file.path);

            const pdfData = await pdfParse(dataBuffer);

            extractedText = pdfData.text;
        }


        // ==========================================
        // 3. EXTRACT TEXT FROM DOCX
        // ==========================================

        else if (
            file.mimetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {

            const result = await mammoth.extractRawText({
                path: file.path
            });

            extractedText = result.value;
        }


        // ==========================================
        // 4. UNSUPPORTED FILE
        // ==========================================

        else {

            return res.status(400).json({
                message: "Only PDF and DOCX files are supported."
            });

        }


        // ==========================================
        // 5. CLEAN EXTRACTED TEXT
        // ==========================================

        extractedText = extractedText
            .replace(/\s+/g, " ")
            .trim();


        // ==========================================
        // 6. CHECK EXTRACTED TEXT
        // ==========================================

        if (!extractedText) {

            return res.status(400).json({
                message: "Could not extract text from the resume."
            });

        }


        console.log("Resume text extracted successfully.");


        // ==========================================
        // 7. SEND RESUME TO AI
        // ==========================================

        console.log("Sending resume to AI for analysis...");


        const analysis = await analyzeWithAI(extractedText);


        console.log("AI resume analysis completed.");


        // ==========================================
        // 8. SAVE RESUME + AI ANALYSIS TO MONGODB
        // ==========================================

        const resume = await Resume.create({

            fileName: file.originalname,

            filePath: file.path,

            extractedText: extractedText,

            analysis: analysis

        });


        // ==========================================
        // 9. SEND RESULT TO FRONTEND
        // ==========================================

        res.status(200).json({

            message: "Resume uploaded and analyzed successfully.",

            resumeId: resume._id,

            fileName: resume.fileName,

            extractedText: resume.extractedText,

            analysis: resume.analysis,

            uploadedAt: resume.uploadedAt

        });


    } catch (error) {

        console.error("Resume analysis error:", error);


        res.status(500).json({

            message: "Failed to analyze resume.",

            error: error.message

        });

    }

};


module.exports = {
    analyzeResume
};