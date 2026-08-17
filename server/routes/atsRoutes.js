const express = require("express");

const {
    checkATSController
} = require("../controllers/atsController");

const router = express.Router();

router.post(
    "/check",
    checkATSController
);

module.exports = router;