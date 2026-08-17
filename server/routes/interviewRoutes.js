const express = require("express");

const {
    startInterview,
    submitInterviewAnswer
} = require("../controllers/interviewController");


const router = express.Router();


router.post(
    "/start",
    startInterview
);


router.post(
    "/evaluate",
    submitInterviewAnswer
);


module.exports = router;