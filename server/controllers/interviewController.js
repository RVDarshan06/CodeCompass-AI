const {
    generateInterviewQuestion,
    evaluateInterviewAnswer
} = require("../services/aiService");


// =====================================================
// START INTERVIEW
// =====================================================

const startInterview = async (req, res) => {

    try {

        const {
            interviewType,
            difficulty,
            previousQuestions
        } = req.body;


        // =================================================
        // VALIDATION
        // =================================================

        if (!interviewType) {

            return res.status(400).json({
                message: "Interview type is required."
            });

        }


        if (!difficulty) {

            return res.status(400).json({
                message: "Difficulty is required."
            });

        }


        // =================================================
        // VALIDATE PREVIOUS QUESTIONS
        // =================================================

        const questions =
            Array.isArray(previousQuestions)
                ? previousQuestions
                : [];


        console.log(
            "Generating interview question..."
        );

        console.log(
            "Interview Type:",
            interviewType
        );

        console.log(
            "Difficulty:",
            difficulty
        );

        console.log(
            "Previous Questions:",
            questions.length
        );


        // =================================================
        // GENERATE QUESTION
        // =================================================

        const question =
            await generateInterviewQuestion(
                interviewType,
                difficulty,
                questions
            );


        console.log(
            "Interview question generated successfully."
        );


        // =================================================
        // SEND RESPONSE
        // =================================================

        return res.status(200).json({

            message:
                "Interview question generated successfully.",

            question,

            interviewType,

            difficulty

        });


    } catch (error) {

        console.error(
            "Start interview error:",
            error
        );


        return res.status(500).json({

            message:
                "Failed to generate interview question.",

            error:
                error.message

        });

    }

};



// =====================================================
// SUBMIT INTERVIEW ANSWER
// =====================================================

const submitInterviewAnswer = async (
    req,
    res
) => {

    try {

        const {
            question,
            answer,
            interviewType,
            difficulty
        } = req.body;


        // =================================================
        // VALIDATION
        // =================================================

        if (!question) {

            return res.status(400).json({
                message: "Question is required."
            });

        }


        if (!answer || !answer.trim()) {

            return res.status(400).json({
                message: "Please provide an answer."
            });

        }


        if (!interviewType) {

            return res.status(400).json({
                message: "Interview type is required."
            });

        }


        if (!difficulty) {

            return res.status(400).json({
                message: "Difficulty is required."
            });

        }


        console.log(
            "Evaluating interview answer..."
        );


        console.log(
            "Interview Type:",
            interviewType
        );


        console.log(
            "Difficulty:",
            difficulty
        );


        // =================================================
        // EVALUATE ANSWER
        // =================================================

        const evaluation =
            await evaluateInterviewAnswer(

                question,

                answer,

                interviewType,

                difficulty

            );


        console.log(
            "Interview answer evaluated successfully."
        );


        // =================================================
        // SEND RESPONSE
        // =================================================

        return res.status(200).json({

            message:
                "Answer evaluated successfully.",

            ...evaluation

        });


    } catch (error) {

        console.error(
            "Submit interview answer error:",
            error
        );


        return res.status(500).json({

            message:
                "Failed to evaluate interview answer.",

            error:
                error.message

        });

    }

};



// =====================================================
// EXPORTS
// =====================================================

module.exports = {

    startInterview,

    submitInterviewAnswer

};