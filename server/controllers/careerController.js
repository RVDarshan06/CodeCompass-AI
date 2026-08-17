const {
    generateCareerRoadmap
} = require("../services/aiService");


// =====================================================
// GENERATE CAREER ROADMAP
// =====================================================

const createCareerRoadmap = async (req, res) => {

    try {

        const {
            targetRole,
            currentSkills,
            experience,
            education,
            studyHours,
            duration
        } = req.body;


        // =================================================
        // VALIDATION
        // =================================================

        if (!targetRole || !targetRole.trim()) {

            return res.status(400).json({
                message: "Target job role is required."
            });

        }


        if (!currentSkills || !currentSkills.trim()) {

            return res.status(400).json({
                message: "Current skills are required."
            });

        }


        if (!experience || !experience.trim()) {

            return res.status(400).json({
                message: "Experience level is required."
            });

        }


        if (!education || !education.trim()) {

            return res.status(400).json({
                message: "Education is required."
            });

        }


        if (!studyHours || !studyHours.trim()) {

            return res.status(400).json({
                message: "Study hours are required."
            });

        }


        if (!duration || !duration.trim()) {

            return res.status(400).json({
                message: "Learning duration is required."
            });

        }


        // =================================================
        // LOG REQUEST
        // =================================================

        console.log(
            "Generating career roadmap..."
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
            "Duration:",
            duration
        );


        // =================================================
        // GENERATE ROADMAP USING AI
        // =================================================

        const roadmap =
            await generateCareerRoadmap(
                targetRole,
                currentSkills,
                experience,
                education,
                studyHours,
                duration
            );


        console.log(
            "Career roadmap generated successfully."
        );


        // =================================================
        // RESPONSE
        // =================================================

        return res.status(200).json({

            message:
                "Career roadmap generated successfully.",

            roadmap

        });


    } catch (error) {

        console.error(
            "Career roadmap controller error:",
            error
        );


        return res.status(500).json({

            message:
                "Failed to generate career roadmap.",

            error:
                error.message

        });

    }

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    createCareerRoadmap
};