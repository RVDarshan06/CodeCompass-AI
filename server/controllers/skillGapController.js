const {
    generateSkillGap
} = require("../services/aiService");


// =====================================================
// GENERATE SKILL GAP
// =====================================================

const createSkillGap = async (req, res) => {

    try {

        const {
            targetRole,
            currentSkills,
            experience,
            education
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


        // =================================================
        // LOG REQUEST
        // =================================================

        console.log(
            "Generating skill gap analysis..."
        );

        console.log(
            "Target Role:",
            targetRole
        );

        console.log(
            "Experience:",
            experience
        );


        // =================================================
        // GENERATE USING AI
        // =================================================

        const skillGap =
            await generateSkillGap(
                targetRole,
                currentSkills,
                experience,
                education
            );


        console.log(
            "Skill gap generated successfully."
        );


        // =================================================
        // RESPONSE
        // =================================================

        return res.status(200).json({

            message:
                "Skill gap analysis generated successfully.",

            skillGap

        });


    } catch (error) {

        console.error(
            "Skill gap controller error:",
            error
        );


        return res.status(500).json({

            message:
                "Failed to generate skill gap analysis.",

            error:
                error.message

        });

    }

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    createSkillGap
};