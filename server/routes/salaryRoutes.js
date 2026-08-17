const express = require("express");

const {
    createSalaryPrediction
} = require("../controllers/salaryController");


const router = express.Router();


// =====================================================
// SALARY PREDICTION
// =====================================================

router.post(
    "/predict",
    createSalaryPrediction
);


module.exports = router;