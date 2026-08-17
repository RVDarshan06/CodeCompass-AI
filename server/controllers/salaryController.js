const {
    generateSalaryPrediction
} = require("../services/aiService");


// =====================================================
// GENERATE SALARY PREDICTION
// =====================================================

const createSalaryPrediction = async (req, res) => {

    try {

        const {
            targetRole,
            experience,
            skills,
            education,
            location
        } = req.body;


        // =================================================
        // VALIDATION
        // =================================================

        if (!targetRole || !targetRole.trim()) {

            return res.status(400).json({
                message: "Target job role is required."
            });

        }


        if (!experience || !experience.trim()) {

            return res.status(400).json({
                message: "Experience level is required."
            });

        }


        if (!skills || !skills.trim()) {

            return res.status(400).json({
                message: "Skills are required."
            });

        }


        if (!education || !education.trim()) {

            return res.status(400).json({
                message: "Education is required."
            });

        }


        if (!location || !location.trim()) {

            return res.status(400).json({
                message: "Location is required."
            });

        }


        // =================================================
        // LOG REQUEST
        // =================================================

        console.log(
            "Generating salary prediction..."
        );

        console.log(
            "Target Role:",
            targetRole
        );

        console.log(
            "Experience:",
            experience
        );

        console.log(
            "Location:",
            location
        );


        // =================================================
        // GENERATE PREDICTION
        // =================================================

        const prediction =
            await generateSalaryPrediction(
                targetRole,
                experience,
                skills,
                education,
                location
            );


        console.log(
            "Salary prediction generated successfully."
        );


        // =================================================
        // RESPONSE
        // =================================================

        return res.status(200).json({

            message:
                "Salary prediction generated successfully.",

            prediction

        });


    } catch (error) {

        console.error(
            "Salary prediction controller error:",
            error
        );


        return res.status(500).json({

            message:
                "Failed to generate salary prediction.",

            error:
                error.message

        });

    }

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    createSalaryPrediction
};