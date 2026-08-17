const express = require("express");
const multer = require("multer");

const {
    analyzeResume
} = require("../controllers/resumeController");

const router = express.Router();


// =========================
// Multer configuration
// =========================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname.replace(/\s+/g, "-");

        cb(null, uniqueName);
    }

});


const upload = multer({

    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {

        const allowedTypes = [

            "application/pdf",

            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

        ];


        if (allowedTypes.includes(file.mimetype)) {

            cb(null, true);

        } else {

            cb(
                new Error("Only PDF and DOCX files are allowed.")
            );

        }

    }

});


// =========================
// Resume Analyze Route
// =========================

router.post(
    "/analyze",
    upload.single("resume"),
    analyzeResume
);


module.exports = router;