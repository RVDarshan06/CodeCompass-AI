import { useState } from "react";

import "../../styles/skillGap.css";


const SkillGapPage = () => {

    // =====================================================
    // FORM STATE
    // =====================================================

    const [formData, setFormData] = useState({

        targetRole: "",

        currentSkills: "",

        experience: "Student",

        education: ""

    });


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
        useState("");


    const [result, setResult] =
        useState(null);


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData(
            previous => ({

                ...previous,

                [name]: value

            })
        );

    };


    // =====================================================
    // GENERATE SKILL GAP
    // =====================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        setError("");

        setResult(null);


        if (
            !formData.targetRole.trim() ||
            !formData.currentSkills.trim() ||
            !formData.education.trim()
        ) {

            setError(
                "Please fill in all required fields."
            );

            return;

        }


        try {

            setLoading(true);


            const response =
                await fetch(
                    "http://localhost:5000/api/skill-gap/generate",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(formData)

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to generate skill gap."
                );

            }


            setResult(
                data.skillGap
            );


        } catch (error) {

            console.error(
                "Skill gap error:",
                error
            );


            setError(
                error.message ||
                "Failed to generate skill gap."
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // RESET
    // =====================================================

    const createAnother = () => {

        setResult(null);

        setError("");

        setFormData({

            targetRole: "",

            currentSkills: "",

            experience: "Student",

            education: ""

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =====================================================
    // RESULT PAGE
    // =====================================================

    if (result) {

        return (

            <div className="skill-gap-page">

                <div className="skill-gap-container">

                    <button
                        className="back-button"
                        onClick={() =>
                            window.location.href =
                                "/dashboard"
                        }
                    >
                        ← Dashboard
                    </button>


                    <div className="page-heading">

                        <h1>
                            🎯 Skill Gap Detection
                        </h1>

                        <p>
                            Your personalized skill analysis
                            for {formData.targetRole}.
                        </p>

                    </div>


                    <div className="result-card">

                        <h2>
                            📊 Your Skill Gap Analysis
                        </h2>


                        {/* READINESS */}

                        <div className="readiness-section">

                            <h3>
                                🚀 Career Readiness
                            </h3>

                            <div className="score">

                                {result.readinessScore}%

                            </div>

                            <p>
                                {result.summary}
                            </p>

                        </div>


                        {/* MATCHED SKILLS */}

                        <section>

                            <h3>
                                ✅ Skills You Already Have
                            </h3>


                            <div className="skill-list">

                                {result.matchedSkills?.length > 0 ? (

                                    result.matchedSkills.map(
                                        (item, index) => (

                                            <div
                                                className="skill-item matched"
                                                key={index}
                                            >

                                                <div>

                                                    <strong>
                                                        {item.skill}
                                                    </strong>

                                                    <span>
                                                        {item.level}
                                                    </span>

                                                </div>

                                                <p>
                                                    {item.comment}
                                                </p>

                                            </div>

                                        )
                                    )

                                ) : (

                                    <p>
                                        No matching skills
                                        were identified.
                                    </p>

                                )}

                            </div>

                        </section>


                        {/* MISSING SKILLS */}

                        <section>

                            <h3>
                                ❌ Missing Skills
                            </h3>


                            <div className="skill-list">

                                {result.missingSkills?.length > 0 ? (

                                    result.missingSkills.map(
                                        (item, index) => (

                                            <div
                                                className="skill-item missing"
                                                key={index}
                                            >

                                                <div>

                                                    <strong>
                                                        {item.skill}
                                                    </strong>

                                                    <span
                                                        className={
                                                            `priority ${String(
                                                                item.priority || ""
                                                            ).toLowerCase()}`
                                                        }
                                                    >
                                                        {item.priority}
                                                    </span>

                                                </div>

                                                <p>
                                                    {item.reason}
                                                </p>

                                            </div>

                                        )
                                    )

                                ) : (

                                    <p>
                                        No major missing
                                        skills were identified.
                                    </p>

                                )}

                            </div>

                        </section>


                        {/* IMPROVEMENT AREAS */}

                        <section>

                            <h3>
                                🛠️ Areas to Improve
                            </h3>


                            <div className="skill-list">

                                {result.improvementAreas?.length > 0 ? (

                                    result.improvementAreas.map(
                                        (item, index) => (

                                            <div
                                                className="skill-item improvement"
                                                key={index}
                                            >

                                                <div>

                                                    <strong>
                                                        {item.skill}
                                                    </strong>

                                                    <span>
                                                        {item.priority}
                                                    </span>

                                                </div>

                                                <p>
                                                    {item.recommendation}
                                                </p>

                                            </div>

                                        )
                                    )

                                ) : (

                                    <p>
                                        No improvement areas
                                        identified.
                                    </p>

                                )}

                            </div>

                        </section>


                        {/* LEARNING ORDER */}

                        <section>

                            <h3>
                                📚 Recommended Learning Order
                            </h3>


                            <ol className="learning-list">

                                {result.learningOrder?.map(
                                    (skill, index) => (

                                        <li key={index}>

                                            <span>
                                                {index + 1}
                                            </span>

                                            {skill}

                                        </li>

                                    )
                                )}

                            </ol>

                        </section>


                        {/* PROJECTS */}

                        <section>

                            <h3>
                                💻 Recommended Projects
                            </h3>


                            <div className="project-list">

                                {result.recommendedProjects?.map(
                                    (project, index) => (

                                        <div
                                            className="project-item"
                                            key={index}
                                        >

                                            <h4>
                                                {project.project}
                                            </h4>

                                            <p>
                                                <strong>
                                                    Skills:
                                                </strong>{" "}
                                                {project.skills}
                                            </p>

                                            <p>
                                                {project.description}
                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>


                        {/* INTERVIEW */}

                        <section>

                            <h3>
                                🎤 Interview Preparation
                            </h3>


                            <div className="interview-topics">

                                {result.interviewTopics?.map(
                                    (topic, index) => (

                                        <span
                                            key={index}
                                        >
                                            {topic}
                                        </span>

                                    )
                                )}

                            </div>

                        </section>


                        {/* ACTIONS */}

                        <div className="result-actions">

                            <button
                                className="primary-button"
                                onClick={createAnother}
                            >
                                ← Create Another Analysis
                            </button>


                            <button
                                className="secondary-button"
                                onClick={() =>
                                    window.location.href =
                                        "/dashboard"
                                }
                            >
                                Dashboard
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // FORM PAGE
    // =====================================================

    return (

        <div className="skill-gap-page">

            <div className="skill-gap-container">

                <button
                    className="back-button"
                    onClick={() =>
                        window.location.href =
                            "/dashboard"
                    }
                >
                    ← Dashboard
                </button>


                <div className="page-heading">

                    <h1>
                        🎯 Skill Gap Detection
                    </h1>

                    <p>
                        Discover the skills you need to
                        reach your target career.
                    </p>

                </div>


                <div className="form-card">

                    <h2>
                        Analyze Your Skills
                    </h2>


                    <form
                        onSubmit={handleSubmit}
                    >

                        {/* TARGET ROLE */}

                        <div className="form-group">

                            <label>
                                Target Job Role
                            </label>

                            <input
                                type="text"
                                name="targetRole"
                                value={
                                    formData.targetRole
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. Full Stack Developer"
                            />

                        </div>


                        {/* CURRENT SKILLS */}

                        <div className="form-group">

                            <label>
                                Current Skills
                            </label>

                            <textarea
                                name="currentSkills"
                                value={
                                    formData.currentSkills
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. HTML, CSS, JavaScript, React, Java, Python"
                                rows="5"
                            />

                            <small>
                                Separate multiple skills
                                using commas.
                            </small>

                        </div>


                        {/* EXPERIENCE */}

                        <div className="form-group">

                            <label>
                                Experience Level
                            </label>

                            <select
                                name="experience"
                                value={
                                    formData.experience
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="Student">
                                    Student
                                </option>

                                <option value="Fresher">
                                    Fresher
                                </option>

                                <option value="Entry Level">
                                    Entry Level
                                </option>

                                <option value="1-2 Years">
                                    1-2 Years
                                </option>

                                <option value="3-5 Years">
                                    3-5 Years
                                </option>

                                <option value="5+ Years">
                                    5+ Years
                                </option>

                            </select>

                        </div>


                        {/* EDUCATION */}

                        <div className="form-group">

                            <label>
                                Education
                            </label>

                            <input
                                type="text"
                                name="education"
                                value={
                                    formData.education
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. B.E. Computer Science"
                            />

                        </div>


                        {/* ERROR */}

                        {error && (

                            <div className="error-message">

                                ❌ {error}

                            </div>

                        )}


                        {/* BUTTON */}

                        <button
                            type="submit"
                            className="generate-button"
                            disabled={loading}
                        >

                            {loading
                                ? "🤖 Analyzing Skills..."
                                : "🎯 Detect Skill Gap →"
                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};


export default SkillGapPage;