import { useState } from "react";
import "../../styles/interviewCoach.css";


const InterviewCoachPage = () => {

    // =====================================================
    // STATE
    // =====================================================

    const [interviewType, setInterviewType] =
        useState("Technical");

    const [difficulty, setDifficulty] =
        useState("Medium");

    const [question, setQuestion] =
        useState("");

    const [answer, setAnswer] =
        useState("");

    const [evaluation, setEvaluation] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [evaluating, setEvaluating] =
        useState(false);

    const [error, setError] =
        useState("");


    // =====================================================
    // STORE PREVIOUS QUESTIONS
    // =====================================================

    const [previousQuestions, setPreviousQuestions] =
        useState([]);


    // =====================================================
    // NORMALIZE QUESTION
    // =====================================================

    const normalizeQuestion = (text) => {

        if (!text) {
            return "";
        }

        return text
            .toLowerCase()
            .replace(/[`"'“”‘’]/g, "")
            .replace(/^\s*\d+[\.\):\-]\s*/, "")
            .replace(/\s+/g, " ")
            .trim();

    };


    // =====================================================
    // CHECK DUPLICATE QUESTION
    // =====================================================

    const isDuplicateQuestion = (
        newQuestion,
        questions
    ) => {

        const normalizedNewQuestion =
            normalizeQuestion(newQuestion);


        return questions.some(
            (oldQuestion) => {

                const normalizedOldQuestion =
                    normalizeQuestion(oldQuestion);


                // Exact duplicate
                if (
                    normalizedNewQuestion ===
                    normalizedOldQuestion
                ) {

                    return true;

                }


                // -----------------------------------------
                // Similarity check
                // -----------------------------------------

                const newWords =
                    new Set(
                        normalizedNewQuestion
                            .split(" ")
                            .filter(
                                word =>
                                    word.length > 3
                            )
                    );


                const oldWords =
                    new Set(
                        normalizedOldQuestion
                            .split(" ")
                            .filter(
                                word =>
                                    word.length > 3
                            )
                    );


                if (
                    newWords.size === 0 ||
                    oldWords.size === 0
                ) {

                    return false;

                }


                let commonWords = 0;


                newWords.forEach(
                    word => {

                        if (
                            oldWords.has(word)
                        ) {

                            commonWords++;

                        }

                    }
                );


                const similarity =
                    commonWords /
                    Math.min(
                        newWords.size,
                        oldWords.size
                    );


                return similarity >= 0.75;

            }
        );

    };


    // =====================================================
    // GENERATE INTERVIEW QUESTION
    // =====================================================

    const generateQuestion = async () => {

        setLoading(true);
        setError("");
        setAnswer("");
        setEvaluation(null);


        try {

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
                previousQuestions
            );


            // =================================================
            // REQUEST NEW QUESTION
            // =================================================

            const response = await fetch(
                "http://localhost:5000/api/interview/start",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        interviewType,

                        difficulty,

                        previousQuestions

                    })

                }
            );


            const data =
                await response.json();


            console.log(
                "Interview API response:",
                data
            );


            // =================================================
            // CHECK SERVER RESPONSE
            // =================================================

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    data.error ||
                    "Failed to generate interview question."
                );

            }


            if (!data.question) {

                throw new Error(
                    "The server did not return an interview question."
                );

            }


            const newQuestion =
                data.question.trim();


            // =================================================
            // CHECK DUPLICATE
            // =================================================

            const duplicate =
                isDuplicateQuestion(
                    newQuestion,
                    previousQuestions
                );


            if (duplicate) {

                console.log(
                    "Duplicate question detected."
                );


                throw new Error(
                    "The AI generated a question similar to a previous question. Please click Generate Different Question again."
                );

            }


            // =================================================
            // SAVE NEW QUESTION
            // =================================================

            setQuestion(
                newQuestion
            );


            setPreviousQuestions(
                oldQuestions => [

                    ...oldQuestions,

                    newQuestion

                ]
            );


            console.log(
                "New unique question:",
                newQuestion
            );


        } catch (error) {

            console.error(
                "Interview start error:",
                error
            );


            setError(
                error.message ||
                "Failed to generate interview question."
            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // START INTERVIEW
    // =====================================================

    const handleStartInterview = async () => {

        await generateQuestion();

    };


    // =====================================================
    // SUBMIT ANSWER
    // =====================================================

    const handleSubmitAnswer = async () => {

        // ---------------------------------------------
        // Validate answer
        // ---------------------------------------------

        if (!answer.trim()) {

            setError(
                "Please enter your answer first."
            );

            return;

        }


        if (!question) {

            setError(
                "No interview question is available."
            );

            return;

        }


        setEvaluating(true);
        setError("");


        try {

            console.log(
                "Submitting answer for evaluation..."
            );


            // =================================================
            // SEND ANSWER TO SERVER
            // =================================================

            const response = await fetch(
                "http://localhost:5000/api/interview/evaluate",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        question,

                        answer,

                        interviewType,

                        difficulty

                    })

                }
            );


            const data =
                await response.json();


            console.log(
                "Evaluation response:",
                data
            );


            // =================================================
            // CHECK RESPONSE
            // =================================================

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    data.error ||
                    "Failed to evaluate answer."
                );

            }


            // =================================================
            // SAVE EVALUATION
            // =================================================

            setEvaluation(
                data
            );


        } catch (error) {

            console.error(
                "Answer evaluation error:",
                error
            );


            setError(
                error.message ||
                "Failed to evaluate answer."
            );


        } finally {

            setEvaluating(false);

        }

    };


    // =====================================================
    // GO TO DASHBOARD
    // =====================================================

    const goToDashboard = () => {

        window.location.href =
            "/dashboard";

    };


    // =====================================================
    // START ANOTHER INTERVIEW
    // =====================================================

    const startAnotherInterview = async () => {

        setQuestion("");

        setAnswer("");

        setEvaluation(null);

        setError("");


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


        // Automatically generate
        // the next question

        await generateQuestion();

    };


    // =====================================================
    // CHANGE INTERVIEW TYPE
    // =====================================================

    const handleInterviewTypeChange = (
        event
    ) => {

        const newType =
            event.target.value;


        setInterviewType(
            newType
        );


        // Clear question history
        // because this is a new category

        setPreviousQuestions([]);


        setQuestion("");

        setAnswer("");

        setEvaluation(null);

        setError("");

    };


    // =====================================================
    // CHANGE DIFFICULTY
    // =====================================================

    const handleDifficultyChange = (
        event
    ) => {

        const newDifficulty =
            event.target.value;


        setDifficulty(
            newDifficulty
        );


        // Clear question history
        // because this is a new difficulty

        setPreviousQuestions([]);


        setQuestion("");

        setAnswer("");

        setEvaluation(null);

        setError("");

    };


    // =====================================================
    // JSX
    // =====================================================

    return (

        <div className="interview-coach">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="interview-header">

                <div>

                    <h1>
                        🤖 Interview Coach
                    </h1>

                    <p>
                        Practice interviews with AI and receive
                        personalized feedback.
                    </p>

                </div>


                <button
                    className="back-button"
                    onClick={goToDashboard}
                >
                    ← Dashboard
                </button>

            </div>



            {/* =================================================
                SETUP
            ================================================= */}

            {!question && !evaluation && (

                <div className="interview-container">

                    <div className="interview-card">


                        <h2>
                            🎯 Interview Setup
                        </h2>


                        <p>
                            Choose the type and difficulty
                            of your interview.
                        </p>



                        {/* =========================================
                            INTERVIEW TYPE
                        ========================================= */}

                        <div className="form-group">

                            <label
                                htmlFor="interviewType"
                            >
                                Interview Type
                            </label>


                            <select
                                id="interviewType"
                                value={interviewType}
                                onChange={
                                    handleInterviewTypeChange
                                }
                            >

                                <option value="Technical">
                                    Technical
                                </option>

                                <option value="Coding">
                                    Coding
                                </option>

                                <option value="HR">
                                    HR
                                </option>

                                <option value="System Design">
                                    System Design
                                </option>

                            </select>

                        </div>



                        {/* =========================================
                            DIFFICULTY
                        ========================================= */}

                        <div className="form-group">

                            <label
                                htmlFor="difficulty"
                            >
                                Difficulty
                            </label>


                            <select
                                id="difficulty"
                                value={difficulty}
                                onChange={
                                    handleDifficultyChange
                                }
                            >

                                <option value="Easy">
                                    Easy
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="Hard">
                                    Hard
                                </option>

                            </select>

                        </div>



                        {/* =========================================
                            QUESTION COUNT
                        ========================================= */}

                        {previousQuestions.length > 0 && (

                            <div
                                style={{
                                    marginBottom: "15px",
                                    color: "#9ca3af",
                                    fontSize: "14px"
                                }}
                            >

                                Questions practiced in this
                                session:

                                {" "}

                                <strong>
                                    {previousQuestions.length}
                                </strong>

                            </div>

                        )}



                        {/* =========================================
                            START INTERVIEW
                        ========================================= */}

                        <button
                            className="start-interview-button"
                            onClick={
                                handleStartInterview
                            }
                            disabled={loading}
                        >

                            {loading

                                ? "Generating Question..."

                                : previousQuestions.length > 0

                                    ? "Generate Different Question →"

                                    : "Start Interview →"

                            }

                        </button>



                        {/* =========================================
                            ERROR
                        ========================================= */}

                        {error && (

                            <div className="interview-error">

                                ❌ {error}

                            </div>

                        )}


                    </div>

                </div>

            )}



            {/* =================================================
                INTERVIEW QUESTION
            ================================================= */}

            {question && !evaluation && (

                <div className="interview-container">

                    <div className="question-card">


                        <h2>
                            🤖 Interview Question
                        </h2>



                        {/* =========================================
                            QUESTION
                        ========================================= */}

                        <div className="question-box">

                            {question}

                        </div>



                        {/* =========================================
                            QUESTION NUMBER
                        ========================================= */}

                        <div
                            style={{
                                marginTop: "10px",
                                marginBottom: "20px",
                                color: "#9ca3af",
                                fontSize: "14px"
                            }}
                        >

                            Question #

                            {previousQuestions.length}

                        </div>



                        {/* =========================================
                            ANSWER LABEL
                        ========================================= */}

                        <label
                            className="answer-label"
                            htmlFor="answer"
                        >
                            Your Answer
                        </label>



                        {/* =========================================
                            ANSWER TEXTAREA
                        ========================================= */}

                        <textarea
                            id="answer"
                            className="answer-input"
                            placeholder="Type your answer here..."
                            value={answer}
                            onChange={
                                (event) =>
                                    setAnswer(
                                        event.target.value
                                    )
                            }
                        />



                        {/* =========================================
                            SUBMIT ANSWER
                        ========================================= */}

                        <button
                            className="submit-answer-button"
                            onClick={
                                handleSubmitAnswer
                            }
                            disabled={evaluating}
                        >

                            {evaluating

                                ? "Evaluating..."

                                : "Submit Answer →"

                            }

                        </button>



                        {/* =========================================
                            ERROR
                        ========================================= */}

                        {error && (

                            <div className="interview-error">

                                ❌ {error}

                            </div>

                        )}


                    </div>

                </div>

            )}



            {/* =================================================
                EVALUATION
            ================================================= */}

            {evaluation && (

                <div className="interview-container">

                    <div className="evaluation-card">


                        <h2>
                            📊 Interview Evaluation
                        </h2>



                        {/* =========================================
                            SCORE
                        ========================================= */}

                        <div className="score-title">
                            Score
                        </div>


                        <div className="score">

                            {evaluation.score}/100

                        </div>



                        {/* =========================================
                            FEEDBACK
                        ========================================= */}

                        <div className="evaluation-section">

                            <h3>
                                💬 Feedback
                            </h3>

                            <p>
                                {evaluation.feedback}
                            </p>

                        </div>



                        {/* =========================================
                            STRENGTHS
                        ========================================= */}

                        <div className="evaluation-section">

                            <h3>
                                💪 Strengths
                            </h3>

                            <p>
                                {evaluation.strengths}
                            </p>

                        </div>



                        {/* =========================================
                            WEAKNESSES
                        ========================================= */}

                        <div className="evaluation-section">

                            <h3>
                                ⚠️ Weaknesses
                            </h3>

                            <p>
                                {evaluation.weaknesses}
                            </p>

                        </div>



                        {/* =========================================
                            IMPROVEMENTS
                        ========================================= */}

                        <div className="evaluation-section">

                            <h3>
                                🚀 Improvements
                            </h3>

                            <p>
                                {evaluation.improvements}
                            </p>

                        </div>



                        {/* =========================================
                            POSSIBLE ANSWER
                        ========================================= */}

                        {evaluation.possibleAnswer && (

                            <div className="possible-answer-section">

                                <h3>
                                    💡 Possible Answer
                                </h3>

                                <div className="possible-answer-box">

                                    {evaluation.possibleAnswer}

                                </div>

                            </div>

                        )}



                        {/* =========================================
                            START ANOTHER INTERVIEW
                        ========================================= */}

                        <button
                            className="another-interview-button"
                            onClick={
                                startAnotherInterview
                            }
                            disabled={loading}
                        >

                            {loading

                                ? "Generating Question..."

                                : "Start Another Interview →"

                            }

                        </button>


                    </div>

                </div>

            )}


        </div>

    );

};


export default InterviewCoachPage;