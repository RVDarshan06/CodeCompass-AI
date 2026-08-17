import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CareerRoadmapPage = () => {

    const navigate = useNavigate();


    // =====================================================
    // FORM STATE
    // =====================================================

    const [formData, setFormData] = useState({

        targetRole: "",

        currentSkills: "",

        experience: "",

        education: "",

        studyHours: "",

        duration: ""

    });


    // =====================================================
    // ROADMAP STATE
    // =====================================================

    const [roadmap, setRoadmap] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // =====================================================
    // GENERATE ROADMAP
    // =====================================================

    const generateRoadmap = async (event) => {

        event.preventDefault();


        setError("");

        setRoadmap(null);


        // =================================================
        // VALIDATION
        // =================================================

        if (!formData.targetRole.trim()) {

            setError(
                "Please enter your target job role."
            );

            return;

        }


        if (!formData.currentSkills.trim()) {

            setError(
                "Please enter your current skills."
            );

            return;

        }


        if (!formData.experience) {

            setError(
                "Please select your experience level."
            );

            return;

        }


        if (!formData.education.trim()) {

            setError(
                "Please enter your education."
            );

            return;

        }


        if (!formData.studyHours) {

            setError(
                "Please select your available study hours."
            );

            return;

        }


        if (!formData.duration) {

            setError(
                "Please select your learning duration."
            );

            return;

        }


        // =================================================
        // API REQUEST
        // =================================================

        try {

            setLoading(true);


            console.log(
                "Generating career roadmap..."
            );


            console.log(
                "Career information:",
                formData
            );


            const response =
                await fetch(
                    "http://localhost:5000/api/career/generate",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                formData
                            )

                    }
                );


            // =================================================
            // READ RESPONSE
            // =================================================

            const data =
                await response.json();


            console.log(
                "Career roadmap response:",
                data
            );


            // =================================================
            // HANDLE SERVER ERROR
            // =================================================

            if (!response.ok) {

                throw new Error(

                    data.message ||

                    data.error ||

                    "Failed to generate career roadmap."

                );

            }


            // =================================================
            // CHECK ROADMAP
            // =================================================

            if (!data.roadmap) {

                throw new Error(
                    "The server did not return a career roadmap."
                );

            }


            setRoadmap(
                data.roadmap
            );


            // Scroll to result
            setTimeout(() => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }, 100);


        } catch (error) {

            console.error(
                "Career roadmap error:",
                error
            );


            setError(

                error.message ||

                "Something went wrong while generating the roadmap."

            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // RESET ROADMAP
    // =====================================================

    const resetRoadmap = () => {

        setRoadmap(null);

        setError("");

        setFormData({

            targetRole: "",

            currentSkills: "",

            experience: "",

            education: "",

            studyHours: "",

            duration: ""

        });


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };


    // =====================================================
    // DASHBOARD
    // =====================================================

    const goToDashboard = () => {

        navigate("/dashboard");

    };


    // =====================================================
    // RENDER ARRAY
    // =====================================================

    const renderList = (items) => {

        if (!items) {
            return null;
        }


        if (!Array.isArray(items)) {

            return (

                <p className="roadmap-text">

                    {String(items)}

                </p>

            );

        }


        return (

            <ul className="roadmap-list">

                {items.map(
                    (item, index) => (

                        <li key={index}>

                            {
                                typeof item === "object"

                                    ? JSON.stringify(item)

                                    : item
                            }

                        </li>

                    )
                )}

            </ul>

        );

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#0f172a",
                color: "#ffffff",
                padding: "40px 20px"
            }}
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto 40px"
                }}
            >

                <button
                    onClick={goToDashboard}
                    style={secondaryButtonStyle}
                >
                    ← Dashboard
                </button>


                <h1
                    style={{
                        fontSize: "42px",
                        marginTop: "25px",
                        marginBottom: "10px"
                    }}
                >
                    🗺️ Career Roadmap
                </h1>


                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "18px"
                    }}
                >
                    Generate a personalized
                    AI-powered learning roadmap
                    for your dream career.
                </p>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            {!roadmap && (

                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        background: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "16px",
                        padding: "35px"
                    }}
                >

                    <h2
                        style={{
                            fontSize: "28px",
                            marginBottom: "10px"
                        }}
                    >
                        🎯 Career Information
                    </h2>


                    <p
                        style={{
                            color: "#94a3b8",
                            marginBottom: "30px"
                        }}
                    >
                        Tell us about your current
                        skills, education and career
                        goal. AI will create a
                        personalized roadmap.
                    </p>


                    <form
                        onSubmit={generateRoadmap}
                    >

                        {/* TARGET ROLE */}

                        <div style={fieldStyle}>

                            <label style={labelStyle}>
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
                                placeholder="Example: Full Stack Developer"
                                style={inputStyle}
                            />

                        </div>


                        {/* CURRENT SKILLS */}

                        <div style={fieldStyle}>

                            <label style={labelStyle}>
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
                                placeholder="Example: HTML, CSS, JavaScript, React, Java, Python, SQL"
                                rows="4"
                                style={textareaStyle}
                            />

                        </div>


                        {/* EXPERIENCE */}

                        <div style={fieldStyle}>

                            <label style={labelStyle}>
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
                                style={inputStyle}
                            >

                                <option value="">
                                    Select experience
                                </option>

                                <option value="Student">
                                    Student
                                </option>

                                <option value="Fresher">
                                    Fresher
                                </option>

                                <option value="0-1 years">
                                    0-1 years
                                </option>

                                <option value="1-2 years">
                                    1-2 years
                                </option>

                                <option value="2-5 years">
                                    2-5 years
                                </option>

                                <option value="5+ years">
                                    5+ years
                                </option>

                            </select>

                        </div>


                        {/* EDUCATION */}

                        <div style={fieldStyle}>

                            <label style={labelStyle}>
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
                                placeholder="Example: B.E. Computer Science"
                                style={inputStyle}
                            />

                        </div>


                        {/* STUDY HOURS */}

                        <div style={fieldStyle}>

                            <label style={labelStyle}>
                                Available Study Hours Per Day
                            </label>


                            <select
                                name="studyHours"
                                value={
                                    formData.studyHours
                                }
                                onChange={
                                    handleChange
                                }
                                style={inputStyle}
                            >

                                <option value="">
                                    Select study hours
                                </option>

                                <option value="1 hour">
                                    1 hour
                                </option>

                                <option value="2 hours">
                                    2 hours
                                </option>

                                <option value="3 hours">
                                    3 hours
                                </option>

                                <option value="4 hours">
                                    4 hours
                                </option>

                                <option value="5+ hours">
                                    5+ hours
                                </option>

                            </select>

                        </div>


                        {/* DURATION */}

                        <div
                            style={{
                                marginBottom: "30px"
                            }}
                        >

                            <label style={labelStyle}>
                                Learning Duration
                            </label>


                            <select
                                name="duration"
                                value={
                                    formData.duration
                                }
                                onChange={
                                    handleChange
                                }
                                style={inputStyle}
                            >

                                <option value="">
                                    Select duration
                                </option>

                                <option value="1 month">
                                    1 month
                                </option>

                                <option value="3 months">
                                    3 months
                                </option>

                                <option value="6 months">
                                    6 months
                                </option>

                                <option value="9 months">
                                    9 months
                                </option>

                                <option value="12 months">
                                    12 months
                                </option>

                            </select>

                        </div>


                        {/* ERROR */}

                        {error && (

                            <div
                                style={{
                                    background: "#450a0a",
                                    border: "1px solid #ef4444",
                                    color: "#fca5a5",
                                    padding: "14px",
                                    borderRadius: "8px",
                                    marginBottom: "20px"
                                }}
                            >

                                ❌ {error}

                            </div>

                        )}


                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                background:
                                    loading
                                        ? "#475569"
                                        : "#3b82f6",
                                border: "none",
                                color: "#ffffff",
                                padding: "15px",
                                borderRadius: "8px",
                                fontSize: "17px",
                                fontWeight: "600",
                                cursor:
                                    loading
                                        ? "not-allowed"
                                        : "pointer"
                            }}
                        >

                            {loading
                                ? "🤖 Generating Roadmap..."
                                : "Generate Career Roadmap →"
                            }

                        </button>

                    </form>

                </div>

            )}


            {/* =================================================
                ROADMAP RESULT
            ================================================= */}

            {roadmap && (

                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto"
                    }}
                >

                    <div
                        style={{
                            background: "#1e293b",
                            border: "1px solid #334155",
                            borderRadius: "16px",
                            padding: "35px"
                        }}
                    >

                        <h2
                            style={{
                                fontSize: "32px",
                                marginBottom: "25px"
                            }}
                        >
                            🚀 Your Career Roadmap
                        </h2>


                        {/* =================================================
                            GOAL
                        ================================================= */}

                        {roadmap.goal && (

                            <section style={sectionStyle}>

                                <h3>
                                    🎯 Career Goal
                                </h3>

                                <p className="roadmap-text">
                                    {roadmap.goal}
                                </p>

                            </section>

                        )}


                        {/* =================================================
                            LEVEL
                        ================================================= */}

                        {roadmap.level && (

                            <section style={sectionStyle}>

                                <h3>
                                    📊 Current Level
                                </h3>

                                <p className="roadmap-text">
                                    {roadmap.level}
                                </p>

                            </section>

                        )}


                        {/* =================================================
                            SKILLS
                        ================================================= */}

                        {roadmap.skills && (

                            <section style={sectionStyle}>

                                <h3>
                                    🛠️ Skills to Learn
                                </h3>


                                <div
                                    style={
                                        tagContainerStyle
                                    }
                                >

                                    {roadmap.skills.map(
                                        (skill, index) => (

                                            <span
                                                key={index}
                                                style={tagStyle}
                                            >
                                                {
                                                    typeof skill === "object"
                                                        ? JSON.stringify(skill)
                                                        : skill
                                                }
                                            </span>

                                        )
                                    )}

                                </div>

                            </section>

                        )}


                        {/* =================================================
                            TECHNOLOGIES
                        ================================================= */}

                        {roadmap.technologies && (

                            <section style={sectionStyle}>

                                <h3>
                                    💻 Technologies
                                </h3>


                                <div
                                    style={
                                        tagContainerStyle
                                    }
                                >

                                    {roadmap.technologies.map(
                                        (
                                            technology,
                                            index
                                        ) => (

                                            <span
                                                key={index}
                                                style={tagStyle}
                                            >
                                                {technology}
                                            </span>

                                        )
                                    )}

                                </div>

                            </section>

                        )}


                        {/* =================================================
                            LEARNING PHASES
                        ================================================= */}

                        {roadmap.phases && (

                            <section style={sectionStyle}>

                                <h3>
                                    📚 Learning Phases
                                </h3>


                                {roadmap.phases.map(
                                    (phase, index) => (

                                        <div
                                            key={index}
                                            style={cardStyle}
                                        >

                                            <h4>
                                                {phase.title ||
                                                    `Phase ${index + 1}`}
                                            </h4>


                                            {phase.duration && (

                                                <p>
                                                    <strong>
                                                        Duration:
                                                    </strong>{" "}
                                                    {
                                                        phase.duration
                                                    }
                                                </p>

                                            )}


                                            {phase.topics && (

                                                <div>

                                                    <strong>
                                                        Topics:
                                                    </strong>

                                                    {renderList(
                                                        phase.topics
                                                    )}

                                                </div>

                                            )}


                                            {phase.description && (

                                                <p
                                                    style={{
                                                        lineHeight: "1.7"
                                                    }}
                                                >
                                                    {
                                                        phase.description
                                                    }
                                                </p>

                                            )}

                                        </div>

                                    )
                                )}

                            </section>

                        )}


                        {/* =================================================
                            PROJECTS
                        ================================================= */}

                        {roadmap.projects && (

                            <section style={sectionStyle}>

                                <h3>
                                    🚀 Recommended Projects
                                </h3>


                                {roadmap.projects.map(
                                    (project, index) => (

                                        <div
                                            key={index}
                                            style={cardStyle}
                                        >

                                            <h4>
                                                {project.title ||
                                                    `Project ${index + 1}`}
                                            </h4>


                                            {project.description && (

                                                <p
                                                    style={{
                                                        lineHeight: "1.7"
                                                    }}
                                                >
                                                    {
                                                        project.description
                                                    }
                                                </p>

                                            )}


                                            {project.skills && (

                                                <div
                                                    style={
                                                        tagContainerStyle
                                                    }
                                                >

                                                    {project.skills.map(
                                                        (
                                                            skill,
                                                            skillIndex
                                                        ) => (

                                                            <span
                                                                key={
                                                                    skillIndex
                                                                }
                                                                style={
                                                                    tagStyle
                                                                }
                                                            >
                                                                {
                                                                    skill
                                                                }
                                                            </span>

                                                        )
                                                    )}

                                                </div>

                                            )}

                                        </div>

                                    )
                                )}

                            </section>

                        )}


                        {/* =================================================
                            WEEKLY PLAN
                        ================================================= */}

                        {roadmap.weeklyPlan && (

                            <section style={sectionStyle}>

                                <h3>
                                    📅 Weekly Learning Plan
                                </h3>


                                {roadmap.weeklyPlan.map(
                                    (week, index) => (

                                        <div
                                            key={index}
                                            style={cardStyle}
                                        >

                                            <h4>
                                                {
                                                    week.week ||
                                                    `Week ${index + 1}`
                                                }
                                            </h4>


                                            {week.focus && (

                                                <p>

                                                    <strong>
                                                        Focus:
                                                    </strong>{" "}

                                                    {
                                                        week.focus
                                                    }

                                                </p>

                                            )}


                                            {week.tasks && (

                                                <div>

                                                    <strong>
                                                        Tasks:
                                                    </strong>

                                                    {renderList(
                                                        week.tasks
                                                    )}

                                                </div>

                                            )}

                                        </div>

                                    )
                                )}

                            </section>

                        )}


                        {/* =================================================
                            INTERVIEW PREPARATION
                        ================================================= */}

                        {roadmap.interviewPrep && (

                            <section style={sectionStyle}>

                                <h3>
                                    🎤 Interview Preparation
                                </h3>


                                {typeof roadmap.interviewPrep ===
                                    "string" ? (

                                    <p
                                        className="roadmap-text"
                                    >
                                        {
                                            roadmap.interviewPrep
                                        }
                                    </p>

                                ) : (

                                    <>

                                        {roadmap.interviewPrep
                                            .technical && (

                                            <div
                                                style={cardStyle}
                                            >

                                                <h4>
                                                    💻 Technical
                                                    Interview
                                                </h4>

                                                {renderList(
                                                    roadmap
                                                        .interviewPrep
                                                        .technical
                                                )}

                                            </div>

                                        )}


                                        {roadmap.interviewPrep
                                            .coding && (

                                            <div
                                                style={cardStyle}
                                            >

                                                <h4>
                                                    🧩 Coding
                                                    Interview
                                                </h4>

                                                {renderList(
                                                    roadmap
                                                        .interviewPrep
                                                        .coding
                                                )}

                                            </div>

                                        )}


                                        {roadmap.interviewPrep
                                            .hr && (

                                            <div
                                                style={cardStyle}
                                            >

                                                <h4>
                                                    👥 HR Interview
                                                </h4>

                                                {renderList(
                                                    roadmap
                                                        .interviewPrep
                                                        .hr
                                                )}

                                            </div>

                                        )}


                                        {roadmap.interviewPrep
                                            .systemDesign && (

                                            <div
                                                style={cardStyle}
                                            >

                                                <h4>
                                                    🏗️ System Design
                                                </h4>

                                                {renderList(
                                                    roadmap
                                                        .interviewPrep
                                                        .systemDesign
                                                )}

                                            </div>

                                        )}

                                    </>

                                )}

                            </section>

                        )}


                        {/* =================================================
                            JOB READINESS
                        ================================================= */}

                        {roadmap.jobReadiness && (

                            <section style={sectionStyle}>

                                <h3>
                                    💼 Job Readiness
                                </h3>


                                {renderList(
                                    roadmap.jobReadiness
                                )}

                            </section>

                        )}


                        {/* =================================================
                            ACTION BUTTONS
                        ================================================= */}

                        <div
                            style={{
                                display: "flex",
                                gap: "15px",
                                flexWrap: "wrap",
                                marginTop: "35px"
                            }}
                        >

                            <button
                                onClick={
                                    resetRoadmap
                                }
                                style={buttonStyle}
                            >
                                ← Create Another Roadmap
                            </button>


                            <button
                                onClick={
                                    goToDashboard
                                }
                                style={
                                    secondaryButtonStyle
                                }
                            >
                                Dashboard
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};


// =====================================================
// STYLES
// =====================================================

const fieldStyle = {

    marginBottom: "25px"

};


const labelStyle = {

    display: "block",

    marginBottom: "8px",

    fontWeight: "600"

};


const inputStyle = {

    width: "100%",

    padding: "13px 15px",

    background: "#0f172a",

    color: "#ffffff",

    border: "1px solid #475569",

    borderRadius: "8px",

    fontSize: "16px",

    boxSizing: "border-box"

};


const textareaStyle = {

    ...inputStyle,

    resize: "vertical"

};


const sectionStyle = {

    borderTop: "1px solid #334155",

    paddingTop: "25px",

    marginTop: "25px"

};


const cardStyle = {

    background: "#0f172a",

    border: "1px solid #334155",

    borderRadius: "10px",

    padding: "20px",

    marginTop: "15px"

};


const tagContainerStyle = {

    display: "flex",

    flexWrap: "wrap",

    gap: "10px",

    marginTop: "15px"

};


const tagStyle = {

    background: "#1d4ed8",

    padding: "8px 14px",

    borderRadius: "20px",

    fontSize: "14px"

};


const buttonStyle = {

    background: "#3b82f6",

    border: "none",

    color: "#ffffff",

    padding: "13px 22px",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "600",

    fontSize: "15px"

};


const secondaryButtonStyle = {

    background: "transparent",

    border: "1px solid #3b82f6",

    color: "#ffffff",

    padding: "13px 22px",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "600",

    fontSize: "15px"

};


export default CareerRoadmapPage;