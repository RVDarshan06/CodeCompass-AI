require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const atsRoutes = require("./routes/atsRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const careerRoutes = require("./routes/careerRoutes");
const skillGapRoutes = require("./routes/skillGapRoutes");
const salaryRoutes = require("./routes/salaryRoutes");


// =====================================================
// CONNECT DATABASE
// =====================================================

connectDB();


// =====================================================
// CREATE EXPRESS APP
// =====================================================

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json());


// =====================================================
// UPLOADED FILES
// =====================================================

app.use(
    "/uploads",
    express.static("uploads")
);


// =====================================================
// API ROUTES
// =====================================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/resume",
    resumeRoutes
);

app.use(
    "/api/ats",
    atsRoutes
);

app.use(
    "/api/interview",
    interviewRoutes
);

app.use(
    "/api/career",
    careerRoutes
);

app.use(
    "/api/skill-gap",
    skillGapRoutes
);

app.use(
    "/api/salary",
    salaryRoutes
);


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

    res.json({
        message: "CodeCompass AI server is running"
    });

});


// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});