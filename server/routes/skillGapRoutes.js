const express = require("express");

const {
    createSkillGap
} = require("../controllers/skillGapController");


const router = express.Router();


// =====================================================
// GENERATE SKILL GAP
// =====================================================

router.post(
    "/generate",
    createSkillGap
);


module.exports = router;