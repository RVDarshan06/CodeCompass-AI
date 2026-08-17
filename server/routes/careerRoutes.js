const express = require("express");

const {
    createCareerRoadmap
} = require("../controllers/careerController");


const router = express.Router();


// =====================================================
// GENERATE CAREER ROADMAP
// =====================================================

router.post(
    "/generate",
    createCareerRoadmap
);


module.exports = router;